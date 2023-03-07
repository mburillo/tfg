import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {	Link,} from 'react-router-dom';
import axios from 'axios';
import { Navegacion } from './Navegacion';
export const Inicio = () =>{
    const baseUrl="http://localhost/apiAplicacion/"
  const [data, setData] = useState([])
  const [modalEliminar, setModalEliminar]= useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado]=useState({
    id: '',
    nombre: '',
    lenguaje: '',
    nivel: ''
  });
  const [filtros, setFiltros]=useState({
    lenguaje: 'PHP',
    nivel: 'Principiante'
  });


  const handleChange=e=>{
    const {name, value}=e.target;
    setFiltros((prevState)=>({
      ...prevState,
      [name]: value
    }))
  }

  const getUsuarios = async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data)
    })
  }

  const filtrarUsuarios = async()=>{
    var f = new FormData();
    f.append("lenguaje", filtros.lenguaje);
    f.append("nivel", filtros.nivel);
    f.append("ACTION","FILTER")
    console.log(f)
    await axios.post(baseUrl, f)
    .then(response=>{
        console.log(response)
      setData(response.data)
    })
  }

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

  useEffect(()=>{
    getUsuarios()
  },[])
    return(
      <>    <Navegacion/><div style={{ textAlign: 'center' }}>
        <div class="row">
          <div class="col-12">
            <nav class="navbar navbar-dark bg-dark">
              <a className="navbar-brand">Lista de usuarios</a>
              <div class="col-3">
                <select id="select-nivel-inicio" name="nivel" className="form-select" onChange={handleChange}>
                  <option selected>Principiante</option>
                  <option>Medio</option>
                  <option>Avanzado</option>
                </select>
              </div>
              <div class="col-3">
                <select id="select-lenguaje-inicio" name="lenguaje" class="form-select" onChange={handleChange}>
                  <option selected>PHP</option>
                  <option>Java</option>
                </select>
              </div>
              <div class="col-3">
                <button id="btnSearch" class="btn btn-outline-success my-2 my-sm-0" type="button" onClick={() => filtrarUsuarios()}>Buscar</button>
                <button id="boton-quitar-filtros" class="btn btn-outline-success my-2 my-sm-0" type="button" onClick={() => getUsuarios()}>Quitar filtros</button>
              </div>
            </nav>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col col-md-12">
            <div>
              <table className="table table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Lenguaje</th>
                    <th>Nivel</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(usuario => (
                    <tr key={usuario.id}>
                      <td>{usuario.id}</td>
                      <td>  <Link to={`/perfil/${usuario.id}`}> {usuario.nombre}</Link></td>
                      <td>{usuario.lenguaje}</td>
                      <td>{usuario.nivel}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => seleccionarUsuario(usuario)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}


                </tbody>

              </table>
            </div>
          </div>
        </div>
        <div class="row">




        </div>
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
      </div></>



      
   
    )
}