import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export function Prueba() {
  const [datos, setDatos] = useState([
    { id: 1, nombre: 'Juan', edad: 25 },
    { id: 2, nombre: 'María', edad: 30 },
    { id: 3, nombre: 'Pedro', edad: 40 },
    { id: 4, nombre: 'Lucía', edad: 20 },
    { id: 5, nombre: 'José', edad: 35 }
  ]);

  return (
    <Container>
      <Row>
        {datos.map(dato => (
          <Col md={4} key={dato.id}>
            <p>ID: {dato.id}</p>
            <p>Nombre: {dato.nombre}</p>
            <p>Edad: {dato.edad}</p>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
