import { useState, useEffect } from "react";
import { Button, Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { cancionesIniciales } from "../helpers/DatosInicio";

const Admin = () => {
  const [canciones, setCanciones] = useState([]);

  const obtenerCanciones = () => {
    const cancionesGuardadas = JSON.parse(localStorage.getItem("canciones")) || [];

    if (cancionesGuardadas.length === 0) {
      localStorage.setItem("canciones", JSON.stringify(cancionesIniciales));
      setCanciones(cancionesIniciales);
    } else {
      setCanciones(cancionesGuardadas);
    }
  };

  useEffect(() => {
    obtenerCanciones();
  }, []);

  const borrarCancion = (id, nombre) => {
    Swal.fire({
      title: `¿Estás seguro de borrar "${nombre}"?`,
      text: "No podrás revertir este paso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#198754",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const cancionesGuardadas = JSON.parse(localStorage.getItem("canciones")) || [];

        const cancionesActualizadas = cancionesGuardadas.filter(
          (cancion) => cancion.id !== id
        );

        localStorage.setItem("canciones", JSON.stringify(cancionesActualizadas));
        setCanciones(cancionesActualizadas);

        Swal.fire(
          "¡Borrada!",
          "La canción ha sido eliminada.",
          "success"
        );
      }
    });
  };

  return (
    <div className="bg-black min-vh-100 py-4">
      <Container>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <h1 className="display-4 fw-bold text-light">
            Administrador de Canciones
          </h1>

          <div>
            <Link className="btn btn-success" to="/admin/crear">
              <i className="bi bi-music-note-list me-2"></i>
              Nueva Canción
            </Link>
<<<<<<< Updated upstream
=======

            <Link className="btn btn-outline-light ms-2" to="/admin/Usuarios">
              <i className="bi bi-people me-2"></i>
              Usuarios
            </Link>
>>>>>>> Stashed changes
          </div>
        </div>

        <hr className="text-secondary" />

        <Table responsive striped bordered hover variant="dark" className="mt-4 mb-5">
          <thead>
            <tr className="text-center align-middle">
              <th>#</th>
              <th>Título</th>
              <th>Artista</th>
              <th>Género</th>
              <th>URL Spotify</th>
              <th>Portada</th>
              <th>Opciones</th>
            </tr>
          </thead>

          <tbody>
            {canciones.map((cancion, indice) => (
              <tr key={cancion.id} className="text-center align-middle">
                <td>{indice + 1}</td>

                <td className="fw-bold">
                  {cancion.nombre}
                </td>

                <td>
                  {cancion.artista}
                </td>

                <td>
                  {cancion.genero}
                </td>

                <td className="align-middle text-center">
                  <a
                    href={cancion.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-success rounded-circle"
                    title="Escuchar en Spotify"
                  >
                    <i className="bi bi-play-fill fs-5"></i>
                  </a>
                </td>

                <td>
                  <img
                    src={cancion.imagen}
                    alt={cancion.nombre}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </td>

                <td>
                  <Link
                    to={`/admin/editar/${cancion.id}`}
                    className="btn btn-success me-2"
                    title="Editar"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Link>

                  <Button
                    variant="danger"
                    title="Borrar"
                    onClick={() => borrarCancion(cancion.id, cancion.nombre)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}

            {canciones.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">
                  No hay canciones cargadas.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Admin;