import React, { useState } from 'react';
import { Link, } from 'react-router-dom';
import axios from 'axios';
export const PorSeguir = (datos) => {
  const baseUrl = "https://codingtogetherspring-production.up.railway.app"
  const [siguiendo, setSiguiendo] = useState(false);


  async function Seguir() {
    var f = new FormData();
    f.append("idPerfil", datos.id)
    f.append("idSeguidor", localStorage.getItem('login'));
    await axios.post(baseUrl + "follow", f)
      .then(response => {
        console.log(response)
        response.data == true ? setSiguiendo(true) : setSiguiendo(false)
      })
  }
  return (
    <div className='col-12'>
      <div style={{ width: '100%' }}>
        <img className="rounded-circle shadow-1-strong me-3"
          src={datos.imagen} alt="avatar" width="60"
          height="60" /><div>
          <Link to={`/perfil/${datos.id}`}><h6 className="fw-bold text-primary mb-1">{datos.nombre}</h6></Link>
          {siguiendo ? <button type="button" id="boton-abrir-modal-editar" className="btn btn-danger flex-grow-1 rounded-pill" onClick={() => Seguir()} >Dejar de seguir</button>
            : <button type="button" id="boton-abrir-modal-editar" className="btn btn-primary flex-grow-1 rounded-pill" onClick={() => Seguir()} >Seguir</button>}
        </div>
      </div>
    </div>
  )
}