import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaListUl, FaUserShield, FaSignInAlt, FaBars } from "react-icons/fa";
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logoImagen from "../assets/Logo.png";

const NavBar = () => {

  const rolUsuario = "usuario"

  return (
    <>
      <Navbar className="bg-dark " data-bs-theme="dark"  >
        <Container fluid>
          <Nav.Link as={NavLink} to="/"><img src={logoImagen} width="20%" className="mx-5" alt="Logo Rollingfy" /></Nav.Link>
          {/* <Navbar.Brand as={NavLink} to="/">RollingFy</Navbar.Brand>*/}
          <Navbar.Toggle aria-controls="navbarScroll" className="border-0 px-0" />
          <Navbar.Collapse id="navbarScroll">

            <Form className="d-flex mx-auto" style={{ maxWidth: '400px', width: '100%' }}>
              <Form.Control
                type="search"
                placeholder="Buscar canción o artista..."
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Buscar</Button>
            </Form>

            <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>
              {rolUsuario === "invitado" && (
                <NavDropdown title="Iniciar Sesión" id="navbarScrollingDropdown" align="end">
                  <NavDropdown.Item as={NavLink} to="/registro">Registrarse</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/login">Login</NavDropdown.Item>
                </NavDropdown>
              )}

              {(rolUsuario === "usuario" || rolUsuario === "admin") && (
                <>
                  <NavDropdown title="Sesion" id="navbarScrollingDropdown" align="end">
                    <Nav.Link as={NavLink} to="/playlist">Mi Playlist</Nav.Link>
                    <Nav.Link as={NavLink} to="/home">Cerrar Sesion</Nav.Link>
                    {rolUsuario === "admin" && (
                      <Nav.Link as={NavLink} to="/admin">Panel Admin</Nav.Link>
                    )}
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
