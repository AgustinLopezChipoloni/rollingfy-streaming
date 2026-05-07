import { useState, useEffect } from "react";
import { Button, Table, Container,Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { cancionesIniciales } from "../helpers/DatosInicio";


const Admin = () => {
  const [canciones, setCanciones] = useState([]);

  const [mostrarReproductor, setMostrarReproductor] = useState(false);
  const [urlEmbed, setUrlEmbed] = useState("");

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

   const abrirReproductor = (url) => {
    let urlAdaptada = url;
    // Transformamos el enlace normal a versión "embed" para el iframe
    if (url.includes("spotify.com/track/")) {
      const idTrack = url.split("track/")[1].split("?")[0];
      urlAdaptada = `https://open.spotify.com/embed/track/${idTrack}?utm_source=generator`;
    }
    setUrlEmbed(urlAdaptada);
    setMostrarReproductor(true);
  };

  const cerrarReproductor = () => {
    setMostrarReproductor(false);
    setUrlEmbed(""); // Limpiamos la URL para detener la música
  };

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

            <Link className="btn btn-outline-light ms-2" to="/admin/Usuarios">
              <i className="bi bi-people me-2"></i>
              Usuarios
            </Link>
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
                   <Button
                    variant="success"
                    className="rounded-circle"
                    title="Escuchar aquí"
                    onClick={() => abrirReproductor(cancion.url)}
                  >
                    <i className="bi bi-play-fill fs-5"></i>
                  </Button>
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

      <Modal show={mostrarReproductor} onHide={cerrarReproductor} centered>
        <Modal.Header closeButton className="bg-dark text-light border-secondary">
          <Modal.Title>Reproductor de Spotify</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark p-0 text-center">
          {urlEmbed ? (
            <iframe
              style={{ borderRadius: "12px", width: "100%", height: "152px" }}
              src={urlEmbed}
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          ) : (
            <p className="text-light p-4">Cargando...</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Admin;