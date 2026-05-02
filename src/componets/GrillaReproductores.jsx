import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GrillaReproductores = () => {
  const [canciones, setCanciones] = useState([]);
  const [generoSeleccionado, setGeneroSeleccionado] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  // 1. Estado para detectar si es celular (esto queda igual, está perfecto)
  const [esCelular, setEsCelular] = useState(window.innerWidth < 768);

  // 2. UN SOLO estado para la cantidad visible. 
  // Evaluamos el ancho de la pantalla al inicio para decidir si arranca en 2 o en 8.
  const [cantidadVisible, setCantidadVisible] = useState(window.innerWidth < 768 ? 2 : 8);

  // 3. Efecto para escuchar si el usuario agranda o achica la ventana
  useEffect(() => {
    const revisarTamanioPantalla = () => {
      setEsCelular(window.innerWidth < 768);
    };
    window.addEventListener("resize", revisarTamanioPantalla);
    return () => window.removeEventListener("resize", revisarTamanioPantalla);
  }, []);

// Detecta automáticamente si estás en 'localhost' o en tu IP '192.168.X.X'
const servidor = window.location.hostname;



  // 4. Efecto para traer los datos
  useEffect(() => {
    fetch(`http://${servidor}:3001/canciones`)
      .then(respuesta => respuesta.json())
      .then(datos => setCanciones(datos))
      .catch(error => console.error("Error cargando canciones:", error));
  }, []);

  // 5. Función de sumar inteligente
  const mostrarMasCanciones = () => {
    if (esCelular) {
      setCantidadVisible(cantidadVisible + 2); // Si es celular, suma 2
    } else {
      setCantidadVisible(cantidadVisible + 8); // Si es PC, suma 10
    }
  };

  // LÓGICA DE FILTRADO
  const cancionesFiltradas = canciones.filter(cancion => {
    const coincideGenero = generoSeleccionado === 'Todos' || cancion.genero === generoSeleccionado;
    const textoBuscado = busqueda.toLowerCase();
    
    const tituloSeguro = cancion.titulo ? cancion.titulo.toLowerCase() : "";
    const artistaSeguro = cancion.artista ? cancion.artista.toLowerCase() : "";

    const coincideTexto = tituloSeguro.includes(textoBuscado) || artistaSeguro.includes(textoBuscado);

    return coincideGenero && coincideTexto;
  });

  // 6. El .slice() ahora es universal. 
  // No importa si es PC o celular, siempre corta a la 'cantidadVisible' actual.
  const cancionesAMostrar = cancionesFiltradas.slice(0, cantidadVisible);

  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-light mb-4 text-center">Explora nuestra música</h2>

      {/* Barra de Búsqueda */}
      <Form className="mb-4 d-flex justify-content-center">
        <Form.Control
          type="search"
          placeholder="Buscar por canción o artista..."
          className="w-50"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </Form>

      {/* Botonera de Géneros */}
      <div className="d-flex justify-content-center flex-wrap gap-3 mb-5">
        <Button variant={generoSeleccionado === 'Todos' ? 'success' : 'outline-success'} onClick={() => setGeneroSeleccionado('Todos')}>Todos</Button>
        <Button variant={generoSeleccionado === 'Rock' ? 'success' : 'outline-success'} onClick={() => setGeneroSeleccionado('Rock')}>Rock</Button>
        <Button variant={generoSeleccionado === 'Pop' ? 'success' : 'outline-success'} onClick={() => setGeneroSeleccionado('Pop')}>Pop</Button>
        <Button variant={generoSeleccionado === 'Trap' ? 'success' : 'outline-success'} onClick={() => setGeneroSeleccionado('Trap')}>Trap</Button>
      </div>

      {/* Grilla de canciones */}
      <Row className="g-4">
        {cancionesAMostrar.map((cancion) => (
          <Col xs={12} md={6} lg={3} key={cancion.id}>
            <iframe
              style={{ borderRadius: "12px" }}
              src={cancion.url}
              width="100%" height="80%" frameBorder="0" allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"
              title={cancion.titulo}
            ></iframe>
             
            <Link to={`/detalle/${cancion.id}`} className="text-decoration-none">
              <Button variant='success' size="sm" className='w-100 rounded-pill fw-bold'>
                Ver Detalle
              </Button>
            </Link>
          </Col>
           
        ))}
      </Row>

      {/* Botón "Cargar más" */}
      {/* 7. Condición liberada: Solo verifica si quedan canciones por mostrar en el array filtrado */}
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