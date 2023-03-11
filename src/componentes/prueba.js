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
          <div class="col-xl-3 col-sm-4 mb-5">
          <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-team/teacher-4.jpg" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
              <h5 class="mb-0">Manuella Nevoresky</h5><span class="small text-uppercase text-muted">CEO - Founder</span>
              <ul class="social mb-0 list-inline mt-3">
                  <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-facebook-f"></i></a></li>
                  <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-twitter"></i></a></li>
                  <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-instagram"></i></a></li>
                  <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-linkedin"></i></a></li>
              </ul>
          </div>
      </div>
        ))}
      </Row>
    </Container>
  );
}
