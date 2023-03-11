import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {	Link,} from 'react-router-dom';
import axios from 'axios';
import { Navegacion } from '../Navegacion';
import {Paginacion} from './Paginacion';
export const Listado = ({data}) =>{
    const baseUrl="http://localhost/apiAplicacion/"
  const [newData, setData] = useState(data)
  const [modalEliminar, setModalEliminar]= useState(false);

 

  const [usuarioSeleccionado, setUsuarioSeleccionado]=useState({
    id: '',
    nombre: '',
    lenguaje: '',
    nivel: ''
  });
  

  

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    console.log(usuarioSeleccionado.id)
    await axios.post(baseUrl, f, {params: {id: usuarioSeleccionado.id}})
    .then(response=>{
        console.log(data)
      setData(data.filter(usuario=>usuario.id!==usuarioSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }


  const seleccionarUsuario=(usuario)=>{
    setUsuarioSeleccionado(usuario);
    abrirCerrarModalEliminar()
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }


    return(
      <> 
        {data.map(usuario => (
                <div class="col-xl-3 col-sm-4 mb-5">
                <div class="bg-white rounded shadow-sm py-5 px-4"><img src={"data:image/png;base64,"+usuario.imagen} alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                    <Link to={`/perfil/${usuario.id}`}> <h5 class="mb-0">{usuario.nombre}</h5><span class="small text-uppercase text-muted">{usuario.lenguaje}</span></Link>
                    <ul class="social mb-0 list-inline mt-3">
                    <li class="list-inline-item"><button className="btn btn-danger" onClick={() => seleccionarUsuario(usuario)}>Eliminar</button></li>
                </ul>
                </div>
                </div>
                ))}
        



   <Modal isOpen={modalEliminar}>
          <ModalHeader>
            Borrar usuario
          </ModalHeader>
          <ModalBody>
            ¿Estás seguro que deseas eliminar el usuario {usuarioSeleccionado && usuarioSeleccionado.nombre}?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => peticionDelete()}>
              Sí
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => abrirCerrarModalEliminar()}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
      </>



      
   
    )
}