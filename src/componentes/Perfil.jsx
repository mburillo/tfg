import { useParams, } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import axios from 'axios';
import { Navegacion } from './Navegacion';
export const Perfil = () => {

  const baseUrl = "https://codingtogetherspring-production.up.railway.app/"
  const params = useParams();
  const [idActual, setIdActual] = useState(params.idPerfil)
  const [data, setData] = useState([])
  const [comentarios, setComentarios] = useState([])
  const [modalEditar, setModalEditar] = useState(false);
  const [siguiendo, setSiguiendo] = useState(false);
  const [mostrarAlert, setMostrarAlert] = useState(false);
  const [credenciales, setCredenciales] = useState({
    id: idActual,
    usuario: data.nombre,
    lenguaje: 'PHP',
    nivel: 'Principiante'
  });

  const [picture, setPicture] = useState({});

  const uploadPicture = (e) => {
    setPicture({
      picturePreview: URL.createObjectURL(e.target.files[0]),
      pictureAsFile: e.target.files[0],
    });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setCredenciales((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const getComentarios = async () => {

    await axios.get(baseUrl + "?idPerfil=" + idActual)
      .then(response => {
        console.log(response.data)
        setComentarios(response.data)
      })
  }
  async function Seguir() {
    var f = new FormData();
    f.append("idPerfil", idActual)
    f.append("idSeguidor", localStorage.getItem('login'));
    await axios.post(baseUrl + "follow", f)
      .then(response => {
        console.log(response)
        response.data == true ? setSiguiendo(true) : setSiguiendo(false)
      })
  }
  async function esSeguidor() {
    var f = new FormData();
    f.append("idPerfil", idActual)
    f.append("idSeguidor", localStorage.getItem('login'));
    await axios.post(baseUrl + "isFollower", f)
      .then(response => {
        console.log("SEGUIDOR" + response.data)
        response.data == true ? setSiguiendo(true) : setSiguiendo(false)
      })
  }

  const peticionPatch = async () => {
    const formData = new FormData();
    formData.append('id', idActual);
    formData.append('username', credenciales.usuario);
    formData.append('language', credenciales.lenguaje);
    formData.append('level', credenciales.nivel);
    formData.append('image', picture.pictureAsFile);
    await axios.patch(baseUrl + "update", formData)
      .then(response => {
        console.log(response.data);
        if (response.data !== false) {
          localStorage.setItem('nombre', response.data.username);
          localStorage.setItem('image', response.data.profileImage);
          getUsuario();
          abrirCerrarModalEditar();
        } else {
          abrirCerrarModalEditar();
          setMostrarAlert(true);
        }
      });
  };


  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }
  const getUsuario = async () => {
    console.log("a")
    await axios.get(baseUrl + "getById", { params: { userId: idActual } })
      .then(response => {
        console.log("e")
        setData(response.data)
        console.log(response.data)
      })
  }
  useEffect(() => {
    setIdActual(params.idPerfil)
  }, [params.idPerfil])
  useEffect(() => {
    getUsuario()
  }, [idActual])
  useEffect(() => {
    getComentarios()
  }, [idActual])
  useEffect(() => {
    esSeguidor()
  }, [siguiendo])


  useEffect(() => {
    if (mostrarAlert) {
      const timer = setTimeout(() => {
        setMostrarAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [mostrarAlert]);
  if (data.length === 0) {
    return <div>Cargando...</div>;
  }
  return (
    <><Navegacion /><div className="container py-5 h-100 vh-50">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-md-9 col-lg-7 col-xl-5">
          <div className="card" style={{ radius: "15px" }}>
            <div className="card-body p-4">
              <div className="d-flex text-black">
                {<><div className="flex-shrink-0"><img src={data.profileImage} alt="imagen-perfil" width="100" height="100" className="rounded-circle" /></div>
                  <div className="flex-grow-1 ms-3">
                    <h5 id="tarjeta-nombre" className="mb-1">{data.username}</h5><p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>Programador</p>
                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ background: "#efefef" }}>
                      <div>
                        <p className="small text-muted mb-1">Lenguaje</p>
                        <p id="tarjeta-lenguaje" className="mb-0">{data.favoriteLanguage.language}</p>
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1">Nivel</p>
                        <p id="tarjeta-nivel" className="mb-0">{data.favoriteLanguage.experienceLevel}</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Id</p>
                        <p id="tarjeta-id" className="mb-0">{data.id}</p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                      <Link to={`/feed`}> <button type="button" className="btn btn-outline-primary me-1 flex-grow-1 rounded-pill">Chat</button></Link>
                      {data.id == localStorage.getItem('login') ? <button type="button" id="boton-abrir-modal-editar" className="btn btn-primary flex-grow-1 rounded-pill" onClick={() => abrirCerrarModalEditar()} >Editar</button>
                        : siguiendo ? <button type="button" id="boton-abrir-modal-editar" className="btn btn-danger flex-grow-1 rounded-pill" onClick={() => Seguir()} >Dejar de seguir</button>
                          : <button type="button" id="boton-abrir-modal-editar" className="btn btn-primary flex-grow-1 rounded-pill" onClick={() => Seguir()} >Seguir</button>}
                    </div>
                  </div></>}
              </div>
            </div>
          </div>
        </div>
      </div><div className={`alert alert-danger ${mostrarAlert ? '' : 'd-none'}`} role="alert">
        Ha habido un error al editar el usuario
      </div>
    </div>
      <Modal isOpen={modalEditar}>
        <ModalHeader>
          Editar usuario
        </ModalHeader>
        <ModalBody>
          <div class="col-md-12">
            <label htmlFor="inputEmail4" className="form-label" >  Nombre de usuario</label>
            <input type="text" class="form-control" name="usuario" id="nombre-usuario-registro" value={data.username} onChange={handleChange} disabled />
          </div>
          <div class="col-md-12">
            <label htmlFor="inputState" className="form-label"  >Lenguaje de programación que más maneja</label>
            <select id="select-lenguaje" class="form-select" name="lenguaje" onChange={handleChange}>
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
          <div class="col-md-12">
            <label>
              Selecciona una imagen:
              <input type="file" className="form-control" name="image" onChange={uploadPicture} />
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
