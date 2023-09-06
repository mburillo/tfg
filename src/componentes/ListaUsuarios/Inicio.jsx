import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

import axios from 'axios';
import { Navegacion } from '../Navegacion';
import { Paginacion } from './Paginacion';
import { Listado } from './Listado'
export const Inicio = () => {
  const baseUrl = "https://codingtogetherspring-production.up.railway.app/"
  const [data, setData] = useState([])
  const [loadingData, setLoadingData] = useState(false)
  const [usuarioLoggeado, setUsuarioLoggeado] = useState([])
  const [modalEliminar, setModalEliminar] = useState(false);

  const [postsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
    id: '',
    nombre: '',
    lenguaje: '',
    nivel: ''
  });
  const [filtros, setFiltros] = useState({
    lenguaje: 'PHP',
    nivel: 'Principiante'
  });


  const handleChange = e => {
    const { name, value } = e.target;
    setFiltros((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const getUsuarios = async () => {
    await axios.get(baseUrl + "getAll", { params: { userId: localStorage.getItem('login') } })
      .then(response => {
        console.log(response.data)
        setData(response.data)
      })
  }

  const filtrarUsuarios = async () => {
    var f = new FormData();
    f.append("language", filtros.lenguaje);
    f.append("level", filtros.nivel);
    f.append("userId", localStorage.getItem('login'))
    await axios.post(baseUrl + "filter", f)
      .then(response => {
        setData(response.data)
      })
  }
  const getCurrentUser = async () => {
    await axios.get(baseUrl + "getById", { params: { userId: localStorage.getItem('login') } })
      .then(response => {
        console.log(response)
        setUsuarioLoggeado(response.data)
      })
  }

  useEffect(() => {
    getCurrentUser()
  }, [])
  useEffect(() => {
    getUsuarios()
  }, [])
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  /*const usuarioLoggeadoId = localStorage.getItem('login');
  const usuarioLoggeado = data.find(usuario => usuario.id == usuarioLoggeadoId);*/
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>  <Navegacion /><div style={{ textAlign: 'center' }}>
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
        <Paginacion
          postsPerPage={postsPerPage}
          totalPosts={data.length}
          paginate={paginate} />
        <Listado
          data={currentPosts}
          loggedUser={usuarioLoggeado}
        />
        <Paginacion
          postsPerPage={postsPerPage}
          totalPosts={data.length}
          paginate={paginate}
        />
      </div>
    </div>
    </>
  )
}