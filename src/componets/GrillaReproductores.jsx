import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { cancionesIniciales } from '../helpers/DatosInicio';

const GrillaReproductores = ({ busqueda = "" }) => {
  const [canciones, setCanciones] = useState([]);
  const [generoSeleccionado, setGeneroSeleccionado] = useState('Todos');

  const [esCelular, setEsCelular] = useState(window.innerWidth < 768);
  const [cantidadVisible, setCantidadVisible] = useState(window.innerWidth < 768 ? 2 : 8);

  useEffect(() => {
    const revisarTamanioPantalla = () => {
      setEsCelular(window.innerWidth < 768);
    };

    window.addEventListener("resize", revisarTamanioPantalla);

    return () => window.removeEventListener("resize", revisarTamanioPantalla);
  }, []);

  useEffect(() => {
    const cancionesGuardadas = JSON.parse(localStorage.getItem('canciones')) || [];

    if (cancionesGuardadas.length === 0) {
      localStorage.setItem('canciones', JSON.stringify(cancionesIniciales));
      setCanciones(cancionesIniciales);
    } else {
      setCanciones(cancionesGuardadas);
    }
  }, []);

  const mostrarMasCanciones = () => {
    if (esCelular) {
      setCantidadVisible(cantidadVisible + 2);
    } else {
      setCantidadVisible(cantidadVisible + 8);
    }
  };

  const agregarAPlaylist = (cancion) => {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioKey'));

    if (!usuarioLogueado) {
      Swal.fire({
        title: 'Debes iniciar sesión',
        text: 'Para agregar canciones a tu playlist primero tenés que iniciar sesión.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#198754'
      });
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    let cancionYaExiste = false;

    const usuariosActualizados = usuarios.map((usuario) => {
      if (usuario.email === usuarioLogueado.email) {
        const playlistActual = usuario.playlist || [];

        const cancionRepetida = playlistActual.find(
          (item) => item.id === cancion.id
        );

        if (cancionRepetida) {
          cancionYaExiste = true;
          return usuario;
        }

        return {
          ...usuario,
          playlist: [...playlistActual, cancion]
        };
      }

      return usuario;
    });

    if (cancionYaExiste) {
      Swal.fire({
        title: 'Canción repetida',
        text: 'Esta canción ya está en tu playlist.',
        icon: 'info',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#198754'
      });
      return;
    }

    const usuarioActualizado = usuariosActualizados.find(
      (usuario) => usuario.email === usuarioLogueado.email
    );

    if (!usuarioActualizado) {
      Swal.fire({
        title: 'Error',
        text: 'No se encontró el usuario en el almacenamiento local.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#198754'
      });
      return;
    }

    localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
    localStorage.setItem('usuarioKey', JSON.stringify(usuarioActualizado));

    Swal.fire({
      title: 'Canción agregada',
      text: `"${cancion.nombre}" se agregó correctamente a tu playlist.`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#198754'
    });
  };

  const normalizarTexto = (texto) => {
    return texto
      ? texto
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
      : "";
  };

  const palabrasIgnoradas = [
    "y",
    "e",
    "ft",
    "feat",
    "con",
    "with",
    "de",
    "el",
    "la",
    "los",
    "las"
  ];

  const cancionesFiltradas = canciones.filter((cancion) => {
    const coincideGenero =
      generoSeleccionado === 'Todos' || cancion.genero === generoSeleccionado;

    const textoCancion = normalizarTexto(`${cancion.nombre} ${cancion.artista}`);

    const terminosBusqueda = normalizarTexto(busqueda)
      .split(/[\s,-]+/)
      .filter(
        (termino) =>
          termino.length > 0 && !palabrasIgnoradas.includes(termino)
      );

    const coincideTexto = terminosBusqueda.every((termino) =>
      textoCancion.includes(termino)
    );

    return coincideGenero && coincideTexto;
  });

  const cancionesAMostrar = cancionesFiltradas.slice(0, cantidadVisible);

  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-light mb-4 text-center">
        Explora nuestra música
      </h2>

      <div className="d-flex justify-content-center gap-3 mb-5 flex-wrap">
        <Button
          variant={generoSeleccionado === 'Todos' ? 'success' : 'outline-success'}
          onClick={() => setGeneroSeleccionado('Todos')}
        >
          Todos
        </Button>

        <Button
          variant={generoSeleccionado === 'Rock' ? 'success' : 'outline-success'}
          onClick={() => setGeneroSeleccionado('Rock')}
        >
          Rock
        </Button>

        <Button
          variant={generoSeleccionado === 'Pop' ? 'success' : 'outline-success'}
          onClick={() => setGeneroSeleccionado('Pop')}
        >
          Pop
        </Button>

        <Button
          variant={generoSeleccionado === 'Trap' ? 'success' : 'outline-success'}
          onClick={() => setGeneroSeleccionado('Trap')}
        >
          Trap
        </Button>
      </div>

      <Row className="g-3">
        {cancionesAMostrar.map((cancion) => (
          <Col xs={12} sm={6} md={4} lg={3} key={cancion.id} className="mb-3">
            <div className="h-100 d-flex flex-column">
              <iframe
                style={{ borderRadius: "12px" }}
                src={cancion.url}
                width="100%"
                height="80"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={cancion.nombre}
              ></iframe>

              <Button
                as={Link}
                to={`/detalle/${cancion.id}/${cancion.nombre.replaceAll(" ", "-")}/${cancion.artista.replaceAll(" ", "-")}`}
                variant="outline-success"
                size="sm"
                className="text-decoration-none rounded-pill fw-bold mt-2 "
              >
                Ver Detalle
              </Button>

              <Button
                variant="success"
                size="sm"
                className="rounded-pill fw-bold mt-2 "
                onClick={() => agregarAPlaylist(cancion)}
              >
                Agregar a Playlist
              </Button>
            </div>
          </Col>
        ))}
      </Row>

      {cantidadVisible < cancionesFiltradas.length && (
        <div className="d-flex justify-content-center mt-4">
          <Button variant="success" onClick={mostrarMasCanciones}>
            Cargar más canciones
          </Button>
        </div>
      )}

      {cancionesFiltradas.length === 0 && (
        <p className="text-center text-secondary mt-4">
          No hay coincidencias
        </p>
      )}
    </Container>
  );
};

export default GrillaReproductores;