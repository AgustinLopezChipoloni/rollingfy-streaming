import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <>
      <Container
        fluid
        className="vh-100 d-flex flex-column justify-content-center"
      >
        <Row className="justify-content-center align-items-center">
          <Col xs={11} sm={8} md={6} lg={4}>
            <Card className="bg-dark text-light border border-light p-4 shadow">
              <Card.Body>
                <h1 className="text-center fw-bold mb-2">Iniciar sesion</h1>
                <p className="text-center fw-bold mb-4">Accede a tu cuenta</p>
                <Form>
                  {/* Email */}

                  <Form.Group className="mb-4">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="diegogimenez@gmail.com"
                      className="bg-dark text-light border-light"
                    />
                    <Form.Text className="fw-bold text-danger">
                      Mensaje de error
                    </Form.Text>
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="mb-3 position-relative">
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Ingresa una contraseña"
                      className="bg-dark text-light border-light pe-5"
                    />
                    <Form.Text className="fw-bold text-danger">
                      Mensaje de error
                    </Form.Text>
                  </Form.Group>

                  {/* Boton ingresar */}
                  <Button
                    type="submit"
                    className="w-100 fw-bold bg-dark border-light"
                  >
                    Ingresar
                  </Button>

                  <p className="text-center fw-bold mt-3 mb-2">o</p>

                  {/* Boton de google */}
                  <Button className="w-100 mt-2 bg-dark border-light d-flex align-items-center justify-content-center gap-2 fw-bold">
                    <FcGoogle size={20} /> Continuar con Google
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
