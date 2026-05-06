import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Container, Row, Card, Col, Form, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { obtenerUsuarios } from "../helpers/LocalStorage";
import { useGoogleLogin } from "@react-oauth/google";
import "../index.css";

const Login = ({ setUsuarioLogueado }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navegacion = useNavigate();

  const [mostrarPassword, setMostrarPassword] = useState(false);

  const onSubmit = (datos) => {
    if (
      datos.email.trim() === import.meta.env.VITE_API_EMAIL &&
      datos.password.trim() === import.meta.env.VITE_API_PASSWORD
    ) {
      setUsuarioLogueado(true);
      Swal.fire({
        title: "Bienvenido administrador",
        text: "Iniciaste sesion correctamente",
        icon: "success",
      });
      navegacion("/admin");
      return;
    }

    const usuarios = obtenerUsuarios();
    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        usuario.email === datos.email.trim().toLowerCase() &&
        usuario.password === datos.password.trim(),
    );

    if (usuarioEncontrado) {
      setUsuarioLogueado(true);
      Swal.fire({
        title: `Bienvenido ${usuarioEncontrado.nombreUsuario}`,
        text: "Iniciaste sesion correctamente",
        icon: "success",
      });
      navegacion("/");
    } else {
      Swal.fire({
        title: "Ocurrio un error",
        text: "Credenciales incorrectas",
        icon: "error",
      });
    }
  };

  const loginConGoogle = useGoogleLogin({
    onSuccess: async (tokenGenerado) => {
      const respuestaGoogle = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${tokenGenerado.access_token}` },
        },
      );
      const datos = await respuestaGoogle.json();

      const usuarios = obtenerUsuarios();
      if (!usuarios.find((usuario) => usuario.email === datos.email)) {
        usuarios.push(
          { nombreUsuario: datos.name, email: datos.email, rol: "usuario" },
          localStorage.getItem("usuariosKey", JSON.stringify(usuarios)),
        );
      }

      localStorage.setItem(
        "usuarioLogueado",
        JSON.stringify({
          nombre: datos.name,
          email: datos.email,
        }),
      );

      setUsuarioLogueado(true);
      Swal.fire({
        title: `Hola ${datos.name}`,
        icon: "success",
      });
      navegacion("/");
    },
  });

  return (
    <>
      <Container fluid>
        <Row className="justify-content-center align-items-center vh-100 ">
          <Col xs={11} sm={8} md={6} lg={4}>
            <Card className="bg-dark text-light border border-light p-4 shadow">
              <Card.Body>
                <h1 className="text-center fw-bold mb-2">Iniciar sesion</h1>
                <p className="text-center fw-bold mb-4">Accede a tu cuenta</p>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Email:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="diego@gmail.com"
                      className="form-control bg-dark text-light border-light"
                      {...register("email", {
                        required: "El email es un campo obligatorio",
                        pattern: {
                          value:
                            /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                          message:
                            "El email debe ser un correo valido por ejemplo: diegogimenez@gmail.com",
                        },
                      })}
                    />
                    <Form.Text className="fw-bold text-danger">
                      {errors.email?.message}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3 position-relative">
                    <Form.Label className="fw-bold">Contraseña:</Form.Label>
                    <Form.Control
                      type={mostrarPassword ? "text" : "password"}
                      placeholder="Ingresa tu contraseña"
                      className="form-control bg-dark text-light border-light pe-5"
                      {...register("password", {
                        required: "La contraseña es un campo obligatorio",
                        pattern: {
                          value:
                            /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                          message:
                            "La contraseña debe tener entre 8 y 16 carácteres, al menos una minúscula, al menos una mayúscula y al menos un carácter especial",
                        },
                      })}
                    />
                    <span
                      onClick={() => setMostrarPassword(!mostrarPassword)}
                      className="btnMusic"
                    >
                      {mostrarPassword ? (
                        <FaEyeSlash className="btnPassword" />
                      ) : (
                        <FaEye className="btnPassword" />
                      )}
                    </span>

                    <Form.Text className="fw-bold text-danger">
                      {errors.password?.message}
                    </Form.Text>
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100 fw-bold bg-dark border-light"
                  >
                    Ingresar
                  </Button>

                  <p className="text-center fw-bold mt-3">o</p>

                  <Button
                    className="w-100 mt-2 bg-dark border-light d-flex align-items-center justify-content-center gap-2 fw-bold"
                    onClick={() => loginConGoogle()}
                  >
                    <FcGoogle className="btnGoogle" /> Continuar con Google
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
