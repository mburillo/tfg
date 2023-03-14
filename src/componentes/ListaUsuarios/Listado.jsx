import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {	Link,} from 'react-router-dom';
import axios from 'axios';
export const Listado = ({data}) =>{
    const baseUrl="http://localhost/apiAplicacion/"
const [newData, setData] = useState([])
const [modalEliminar, setModalEliminar]= useState(false);
const [datosCargados, setDatosCargados] = useState(false)
useEffect(()=>{
    setData(data)
    setDatosCargados(true)
  },[data])

  const [usuarioSeleccionado, setUsuarioSeleccionado]=useState({
    id: '',
    nombre: '',
    lenguaje: '',
    nivel: ''
  });
  
  async function Seguir(id){
    var f = new FormData();
    f.append("idPerfil",id)
    f.append("idSeguidor", localStorage.getItem('login'));
    f.append("ACTION","SEGUIR")
    await axios.post(baseUrl, f)
    .then(response=>{
     // response.data==1 ? setSiguiendo(true) : setSiguiendo(false)     
    })
  }
  
  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    console.log(usuarioSeleccionado.id)
    await axios.post(baseUrl, f, {params: {id: usuarioSeleccionado.id}})
    .then(response=>{
        console.log(data)
      setData(newData.filter(usuario=>usuario.id!==usuarioSeleccionado.id));
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

  if (!datosCargados) {
    return <div>Cargando...</div>
  }else{
    return(
      <> 
        {newData.map(usuario => (
                <div class="col-xl-3 col-sm-4 mb-5">
                <div class="bg-white rounded shadow-sm py-5 px-4"><img src={"data:image/png;base64,"+usuario.imagen} alt="" width="100" height="100" class="rounded-circle" />
                    <Link to={`/perfil/${usuario.id}`}> <h5 class="mb-0">{usuario.nombre}</h5> </Link>
                    <span class="small text-uppercase text-muted">{usuario.lenguaje}</span>
                  <span class="small text-uppercase text-muted"> {usuario.nivel}</span>
                    <ul class="social mb-0 list-inline mt-3">
                    <li class="list-inline-item">
                      {localStorage.getItem('login')==usuario.id ? <button className="btn btn-danger" onClick={() => seleccionarUsuario(usuario)}>Eliminar</button> 
                      :usuario.seguidor_id ? <button type="button" id="boton-abrir-modal-editar"className="btn btn-danger flex-grow-1"  onClick={() => Seguir(usuario.id)} >Dejar de seguir</button>
                      :<button type="button" id="boton-abrir-modal-editar"className="btn btn-primary flex-grow-1"  onClick={() => Seguir(usuario.id)} >Seguir</button>  } 
                      
                      </li>
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
}