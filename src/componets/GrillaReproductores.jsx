import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GrillaReproductores = () => {
  const [canciones, setCanciones] = useState([]);
  const [generoSeleccionado, setGeneroSeleccionado] = useState('Todos');


  useEffect(() => {
    fetch('/canciones.json')
      .then(respuesta => respuesta.json())
      .then(datos => setCanciones(datos))
      .catch(error => console.error("Error:", error));
  }, []);

  const cancionesFiltradas = generoSeleccionado === 'Todos'
    ? canciones
    : canciones.filter(cancion => cancion.genero === generoSeleccionado);

  return (
    <Container className="mt-5">
      <h2 className="text-light mb-4 text-center">Explora por Género</h2>

    
      <div className="d-flex justify-content-center gap-3 mb-5">
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
        {cancionesFiltradas.map((cancion) => (
       
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
              <Link 
                to={`/detalle/${cancion.id}/${cancion.nombre.replaceAll(" ", "-")}/${cancion.artista.replaceAll(" ", "-")}`} 
                className="text-decoration-none"
              >
                <Button variant='outline-light' size="sm" className='w-80 rounded-pill fw-bold mt-2'>
                  Ver Detalle
                </Button>
              </Link>
            </div>
          </Col>
        ))}
      </Row>

      {cancionesFiltradas.length === 0 && (
        <p className="text-center text-secondary mt-4">
          No hay canciones de este género aún.
        </p>
      )}
    </Container>
  );
};

export default GrillaReproductores;