import React, {useState } from 'react';
import {	Link,} from 'react-router-dom';
import axios from 'axios';
export const PorSeguir = (datos) => {
  const baseUrl="http://localhost/apiAplicacion/"
  const [siguiendo, setSiguiendo] = useState(false);
 
  async function Seguir(){
    var f = new FormData();
    f.append("idPerfil",datos.id)
    f.append("idSeguidor", localStorage.getItem('login'));
    f.append("ACTION","SEGUIR")
    await axios.post(baseUrl, f)
    .then(response=>{
      response.data==1 ? setSiguiendo(true) : setSiguiendo(false)     
    })
  }
    return(
        <div className='col-12'>
        <div style={{ width: '100%' }}>
  <img className="rounded-circle shadow-1-strong me-3"
  src={"data:image/png;base64,"+datos.imagen} alt="avatar" width="60"
  height="60" /><div>

    <Link to={`/perfil/${datos.id}`}><h6 className="fw-bold text-primary mb-1">{datos.nombre}</h6></Link>
    {siguiendo ? <button type="button" id="boton-abrir-modal-editar"className="btn btn-danger flex-grow-1"  onClick={() => Seguir()} >Dejar de seguir</button>
                      :<button type="button" id="boton-abrir-modal-editar"className="btn btn-primary flex-grow-1"  onClick={() => Seguir()} >Seguir</button>}
  </div>
  </div>
  </div>
             
    )
}