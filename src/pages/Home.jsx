import React from 'react'
import { Container, Row, Col, Carousel } from 'react-bootstrap'
import CardCancion from '../componets/Cardcancion'
import { cancionesIniciales } from '../helpers/DatosInicio'


const Home = () => {
  return (
    <>
      <div className='bg-black text-white min-vh-100 py-4'>
        <Container>
          <h3 className='fw-bold mb-4'>Descubrir</h3>
        
          <Row className='g-2 g-md-3 mb-5'>
            {cancionesIniciales.map((cancion) => (
             <Col key={cancion.id} xs={6} sm={4} md={3} lg={2} className="mb-3">
              <CardCancion cancion={cancion} />
             </Col>
            ))}
          </Row>
          <h3 className='fw-bold mb-4'>Novedades y Artistas Destacados</h3>
           <Carousel className='mb-5 shadow-lg rounded-4 overflow-hidden'>
             
            <Carousel.Item>
              <img
              className="d-block w-100 object-fit-cover"
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"
              alt="Segundo slide"
              height="300"
            />
            <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2 mb-3">
              <h3>Canciones de la Semana</h3>
              <p>¿¡quieres oir que paso esta semana?, ¡ESCUCHA!</p>
            </Carousel.Caption>
            </Carousel.Item>
           
            <Carousel.Item>
              <img
              className="d-block w-100 object-fit-cover"
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"
              alt="Segundo slide"
              height="300"
            />
            <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2 mb-3">
              <h3>Artistas en Tendencia</h3>
              <p>Descubre lo último de los artistas mas destacados.</p>
            </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
              className="d-block w-100 object-fit-cover"
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"
              alt="Segundo slide"
              height="300"
            />
            <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2 mb-3">
              <h3>Nuevos Lanzamientos</h3>
              <p>Descubre lo último de tus artistas favoritos.</p>
            </Carousel.Caption>
            </Carousel.Item>
            </Carousel>  
            </Container>
        </div>     
        
    </>
  )
}

export default Home


