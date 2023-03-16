import { useParams, 	} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {	Link,} from 'react-router-dom';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import axios from 'axios';
import { Navegacion } from './Navegacion';
export const Perfil =() => {

  const baseUrl="http://localhost/apiAplicacion/"
  const [data, setData] = useState([])
  const params = useParams();

  const [comentarios, setComentarios] = useState([])
  const [modalEditar, setModalEditar]= useState(false);
  const [siguiendo, setSiguiendo]= useState(false);
  const [credenciales, setCredenciales]=useState({
    id: params.idPerfil,
    usuario: data.nombre,
    lenguaje: 'PHP',
    nivel:'Principiante'
  });
  
  const [picture, setPicture] = useState({});
  const [comentario, setComentario] = useState({comentario:''});

    const uploadPicture = (e) => {
      setPicture({
        picturePreview: URL.createObjectURL(e.target.files[0]),
        pictureAsFile: e.target.files[0],
      });
    };

  const handleChange=e=>{
    const {name, value}=e.target;
    setCredenciales((prevState)=>({
      ...prevState,
      [name]: value
    }))
  }

  const cambioComentario=e=>{
    const {name, value}=e.target;
    setComentario((prevState)=>({
      ...prevState,
      [name]: value
    }))
  }

  const getUsuario = async()=>{
    await axios.get(baseUrl+"?id="+params.idPerfil)
    .then(response=>{
      setData(response.data[0])
      console.log(response.data)
    })
  }


async function Seguir(){
  var f = new FormData();
  f.append("idPerfil",params.idPerfil)
  f.append("idSeguidor", localStorage.getItem('login'));
  f.append("ACTION","SEGUIR")
  await axios.post(baseUrl, f)
  .then(response=>{
    response.data==1 ? setSiguiendo(true) : setSiguiendo(false)     
  })
}
async function esSeguidor(){
  var f = new FormData();
  f.append("idPerfil",params.idPerfil)
  f.append("idSeguidor", localStorage.getItem('login'));
  f.append("ACTION","ES_SEGUIDOR")
  await axios.post(baseUrl, f)
  .then(response=>{
      console.log("SEGUIDOR"+response.data)
      response.data==1 ? setSiguiendo(true) : setSiguiendo(false)      
  })
}

const getComentarios= async()=>{

  await axios.get(baseUrl+"?idPerfil="+params.idPerfil)
  .then(response=>{
    console.log(response.data)
    setComentarios(response.data)  
  })
}



const guardarComentario = async()=>{
  var f = new FormData();
  console.log(comentario.comentario)
  f.append("idPerfil",params.idPerfil)
  f.append("idComentador", localStorage.getItem('login'));
  f.append("comentario", comentario.comentario);
  f.append("ACTION","GUARDAR_COMENTARIO")
  await axios.post(baseUrl, f)
  .then(response=>{
      console.log(response.data)
      getComentarios()
  })
}


const peticionPatch = async()=>{
  var f = new FormData();
  f.append("id",credenciales.id)
  f.append("usuario", credenciales.usuario);
  f.append("lenguaje", credenciales.lenguaje);
  f.append("nivel",credenciales.nivel)
  f.append("imagen",picture.pictureAsFile)
  f.append("ACTION","PATCH")
  await axios.post(baseUrl, f)
  .then(response=>{
      localStorage.setItem('nombre',credenciales.usuario)
      getUsuario()
      abrirCerrarModalEditar()
  })
}


const abrirCerrarModalEditar=()=>{
  setModalEditar(!modalEditar);
}

  useEffect(()=>{
    getUsuario()
  },[])

  useEffect(()=>{
    getComentarios()
  },[])
  useEffect(()=>{
    esSeguidor()
  },[])
  return (
       <><Navegacion /><div className="container py-5 h-100 vh-50">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-md-9 col-lg-7 col-xl-5">
          <div className="card" style={{ radius: "15px" }}>
            <div className="card-body p-4">
              <div className="d-flex text-black">

                  {<><div className="flex-shrink-0"><img src={"data:image/png;base64,"+data.imagen} alt="imagen-perfil" width="100" height="100"  className="rounded-circle"/></div>
                    <div className="flex-grow-1 ms-3">
                      <h5 id="tarjeta-nombre" className="mb-1">{data.nombre}</h5><p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>Programador</p>
                      <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                        style={{ background: "#efefef" }}>
                        <div>
                          <p className="small text-muted mb-1">Lenguaje</p>
                          <p id="tarjeta-lenguaje" className="mb-0">{data.lenguaje}</p>
                        </div>
                        <div className="px-3">
                          <p className="small text-muted mb-1">Nivel</p>
                          <p id="tarjeta-nivel" className="mb-0">{data.nivel}</p>
                        </div>
                        <div>
                          <p className="small text-muted mb-1">Id</p>
                          <p id="tarjeta-id" className="mb-0">{data.id}</p>

                        </div>

                      </div>

                      <div className="d-flex pt-1">
                      <Link to={`/feed`}> <button type="button" className="btn btn-outline-primary me-1 flex-grow-1 rounded-pill">Chat</button></Link>
                      {data.id==localStorage.getItem('login')?<button type="button" id="boton-abrir-modal-editar"className="btn btn-primary flex-grow-1 rounded-pill"  onClick={() => abrirCerrarModalEditar()} >Editar</button>
                      : siguiendo ? <button type="button" id="boton-abrir-modal-editar"className="btn btn-danger flex-grow-1 rounded-pill"  onClick={() => Seguir()} >Dejar de seguir</button>
                      :<button type="button" id="boton-abrir-modal-editar"className="btn btn-primary flex-grow-1 rounded-pill"  onClick={() => Seguir()} >Seguir</button>}  
                      </div>
                    </div></>}
              
              </div>
            </div>
          </div>
        </div>
      </div><div className="alert alert-success d-none alert-editar-success" role="alert">
        Se ha editado el usuario
      </div><div className="alert alert-danger d-none alert-editar" role="alert">
        Ha habido un error editando el perfil
      </div>
</div>


<div class="row d-flex justify-content-center mt-100 mb-100">

				<div class="col-lg-6">
				  <div class="card">
					<div class="card-body p-4">
					  <div class="d-flex flex-start w-100">

						<div class="w-100">
						  <h5>Añadir un comentario</h5>

						  <div class="form-outline">
							<textarea class="form-control" name="comentario"  onChange={cambioComentario} id="contenido-texto" rows="4"></textarea>
							<label class="form-label" for="textAreaExample">Escribe tu comentario</label>
						  </div>
						  <div class="d-flex justify-content-between mt-3">
							<button type="button" class="btn btn-success rounded-pill" id="boton-guardar-comentario" onClick={() => guardarComentario()}>
							  Enviar <i class="fas fa-long-arrow-alt-right ms-1"></i>
							</button>
						  </div>
						</div>
					  </div>
				  </div>
				</div>
			  </div>
			</div>

    <div class="row d-flex justify-content-center mt-100 mb-100">
			<div class="col-lg-6 p-2">
				<div class="card p-4">
					<div class="card-body text-center">
						<h4 class="card-title">Últimos comentarios</h4>
					</div>
					<div class="comment-widgets" id="comentarios-perfil">
          {comentarios.map(comentario => (
          <div class="d-flex flex-row comment-row m-t-0">

				  <div class="comment-text w-100">
					<h6 class="fs-3 fw-bold">{comentario.nombre_usuario}</h6> <span class="m-b-15 d-block">{comentario.contenido} </span>
					<div class="comment-footer"> <span class="text-muted float-right">{comentario.fecha}</span> <button type="button" class="btn btn-cyan btn-sm">Edit</button> <button type="button" class="btn btn-success btn-sm">Publish</button> <button type="button" class="btn btn-danger btn-sm">Delete</button> </div>	
        </div>      
			    </div>
      		))}
					</div> 
				</div>
			</div>
		</div>

<Modal isOpen={modalEditar}>
          <ModalHeader>
            Editar usuario
          </ModalHeader>
          <ModalBody>
          <div class="col-md-12">
			  <label htmlFor="inputEmail4"  className="form-label" >  Nombre de usuario</label>
			  <input type="text" class="form-control" name="usuario" id="nombre-usuario-registro" value={credenciales.usuario} onChange={handleChange}/>
			</div>
      <div class="col-md-12">
			  <label htmlFor="inputState" className="form-label"  >Lenguaje de programación que más maneja</label>
			  <select id="select-lenguaje" class="form-select" name="lenguaje"  onChange={handleChange}>
              <option selected>PHP</option>
			  <option>Java</option>
			  </select>
			</div>
			<div class="col-md-12">
			<label htmlFor="inputState" className="form-label">Nivel en ese lenguaje</label>
			<select id="select-nivel" name="nivel" class="form-select" onChange={handleChange} >
			  <option selected>Principiante</option>
			  <option>Medio</option>
			  <option>Avanzado</option>
			</select>
			</div>
      <div class="col-md-6">
            <label>
        Selecciona una imagen:
        <input type="file" name="image" onChange={uploadPicture} />
      </label>
      </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-warning" onClick={() => peticionPatch()}>
            Editar
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => abrirCerrarModalEditar()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </>);
      }
      