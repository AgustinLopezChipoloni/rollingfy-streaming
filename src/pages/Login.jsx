import { useState } from "react";
import { Container, Row, Card, Col, Form, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "../index.css";

const Login = () => {
  const [mostrarPassword, setMostrarPassword] = useState(false);

  return (
    <>
      <Container fluid>
        <Row className="justify-content-center align-items-center vh-100 ">
          <Col xs={11} sm={8} md={6} lg={4}>
            <Card className="bg-dark text-light border border-light p-4 shadow">
              <Card.Body>
                <h1 className="text-center fw-bold mb-2">Iniciar sesion</h1>
                <p className="text-center fw-bold mb-4">Accede a tu cuenta</p>
                <Form>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Email:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="diego@gmail.com"
                      className="bg-dark text-light border-light input"
                    />
                    <Form.Text className="fw-bold text-danger">
                      mensaje de error
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3 position-relative">
                    <Form.Label className="fw-bold">Contraseña:</Form.Label>
                    <Form.Control
                      type={mostrarPassword ? "text" : "password"}
                      placeholder="Ingresa tu contraseña"
                      className="bg-dark text-light border-light pe-5 input"
                    />
                    <span
                      onClick={() => setMostrarPassword(!mostrarPassword)}
                      className="btnMusic"
                    >
                      {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>

                    <Form.Text className="fw-bold text-danger">
                      Mensaje de error
                    </Form.Text>
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100 fw-bold bg-dark border-light"
                  >
                    Ingresar
                  </Button>

                  <p className="text-center fw-bold mt-3">o</p>

                  <Button className="w-100 mt-2 bg-dark border-light d-flex align-items-center justify-content-center gap-2 fw-bold">
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
