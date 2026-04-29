import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h1>Iniciar sesion</h1>
                <p>Accede a tu cuenta</p>
                <Form>
                  {/* Email */}

                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="diegogimenez@gmail.com"
                    />
                    <Form.Text>Mensaje de error</Form.Text>
                  </Form.Group>

                  {/* Password */}
                  <Form.Group>
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Ingresa una contraseña"
                    />
                    <Form.Text>Mensaje de error</Form.Text>
                  </Form.Group>

                  {/* Boton ingresar */}
                  <Button type="submit"> Ingresar</Button>

                  <p>o</p>

                  {/* Boton de google */}
                  <Button>
                    {" "}
                    <FcGoogle /> Continuar con Google
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
