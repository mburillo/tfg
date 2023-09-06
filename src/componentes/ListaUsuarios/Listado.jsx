import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
export const Listado = ({ data, loggedUser }) => {
  const navigate = useNavigate();

  const baseUrl = "https://codingtogetherspring-production.up.railway.app/"
  const [newData, setData] = useState([])
  const [modalEliminar, setModalEliminar] = useState(false);
  const [datosCargados, setDatosCargados] = useState(false)
  useEffect(() => {
    setData(data)
    setDatosCargados(true)
  }, [data])
  const [siguiendo, setSiguiendo] = useState({});
  const seguirUsuario = (idUsuario) => {
    setSiguiendo({ ...siguiendo, [idUsuario]: !siguiendo[idUsuario] });
  }

  useEffect(() => {

    const siguiendoInicial = {};
    newData.forEach((usuario) => {
      let siguiendoUsuario = false;
      if (loggedUser && loggedUser.followingIds && loggedUser.followingIds.size !== 0) {
        siguiendoUsuario = loggedUser.followingIds.includes(usuario.id);
      }
      siguiendoInicial[usuario.id] = siguiendoUsuario;
    });
    setSiguiendo(siguiendoInicial);
  }, [newData]);

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
    id: '',
    nombre: '',
    lenguaje: '',
    nivel: ''
  });

  async function Seguir(id) {
    var f = new FormData();
    f.append("idPerfil", id)
    f.append("idSeguidor", localStorage.getItem('login'));
    await axios.post(baseUrl + "follow", f)
      .then(response => {
        console.log(response)
        seguirUsuario(id)
      })
  }

  const peticionDelete = async () => {
    var f = new FormData();
    console.log(usuarioSeleccionado.id)
    await axios.delete(`${baseUrl}delete/${usuarioSeleccionado.id}`)
      .then(response => {
        console.log(data)
        setData(newData.filter(usuario => usuario.id !== usuarioSeleccionado.id));
        abrirCerrarModalEliminar();
        if (data) {
          localStorage.removeItem('login')
          localStorage.removeItem('nombre')
          navigate('/login', {
            replace: true,
          });
        }
      }).catch(error => {
        console.log(error);
      })
  }


  const seleccionarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    abrirCerrarModalEliminar()
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }


  const [indiceHovereado, setIndiceHovereado] = useState(-1);

  const toggleHover = (index) => {
    setIndiceHovereado(index);
  };
  if (!datosCargados) {
    return <div>Cargando...</div>
  } else {
    return (
      <>
        {newData.map((usuario, indice) => (
          <div class="col-xl-3 col-sm-4 mb-5">
            <div key={indice}
              className={
                indiceHovereado === indice
                  ? "bg-white rounded shadow py-5 px-4"
                  : "bg-white rounded shadow-sm py-5 px-4"
              }
              onMouseEnter={() => toggleHover(indice)}
              onMouseLeave={() => toggleHover(-1)}>
              <img src={usuario.profileImage} alt="" width="100" height="100" class="rounded-circle" />
              <Link to={`/perfil/${usuario.id}`}> <h5 class="mb-0">{usuario.username}</h5> </Link>
              <span class="small text-uppercase text-muted">{usuario.favoriteLanguage.language}</span>
              <span class="small text-uppercase text-muted"> {usuario.favoriteLanguage.experienceLevel}</span>
              <ul class="social mb-0 list-inline mt-3">
                <li class="list-inline-item">
                  {localStorage.getItem('login') == usuario.id ? <button className="btn btn-danger rounded-pill" onClick={() => seleccionarUsuario(usuario)}>Eliminar</button>
                    : siguiendo[usuario.id] ? <button type="button" id="boton-abrir-modal-editar" className="btn btn-danger flex-grow-1 rounded-pill" onClick={() => Seguir(usuario.id)} >Dejar de seguir</button> :
                      <button type="button" id="boton-abrir-modal-editar" className="btn btn-primary flex-grow-1 rounded-pill" onClick={() => Seguir(usuario.id)} >Seguir</button>}
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
            ¿Estás seguro que deseas eliminar el usuario {usuarioSeleccionado && usuarioSeleccionado.username}?
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