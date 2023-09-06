import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Navegacion } from './Navegacion';

export const Registro = () => {

  const baseUrl = "https://codingtogetherspring-production.up.railway.app/register"
  const navigate = useNavigate();
  const [mostrarAlert, setMostrarAlert] = useState(false);
  const [credenciales, setCredenciales] = useState({
    usuario: '',
    clave: '',
    lenguaje: 'PHP',
    nivel: 'Principiante',
    image: ''
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

  const register = async () => {
    const formData = new FormData();
    formData.append('password', credenciales.clave)
    formData.append('username', credenciales.usuario);
    formData.append('language', credenciales.lenguaje);
    formData.append('level', credenciales.nivel);
    formData.append('image', picture.pictureAsFile);
    await axios.post(baseUrl, formData)
      .then(response => {
        console.log(response)
        if (response.data != "") {
          localStorage.setItem('login', response.data.id)
          localStorage.setItem('nombre', credenciales.usuario)
          localStorage.setItem('image', response.data.profileImage)
          navigate('/', {
            replace: true,
            state: {
              logged: true,
              name: credenciales.usuario,
            },
          });
        } else {
          setMostrarAlert(true)
        }
      })
  }


  useEffect(() => {
    if (mostrarAlert) {
      const timer = setTimeout(() => {
        setMostrarAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [mostrarAlert]);


  return (
    <>    <Navegacion />
      <div className="d-flex justify-content-center">
        <h1>Registro</h1>
      </div>
      <form className="row g-3" encType="multipart/form-data">
        <div className="d-flex justify-content-center">
          <div className="col-md-6">
            <label htmlFor="nombre-usuario-registro" className="form-label">Nombre de usuario</label>
            <input type="text" className="form-control" name="usuario" id="nombre-usuario-registro" onChange={handleChange} />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="col-md-6">
            <label htmlFor="clave-usuario-registro" className="form-label">Contraseña</label>
            <input type="password" className="form-control" name="clave" id="clave-usuario-registro" onChange={handleChange} />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="col-md-6">
            <label htmlFor="select-lenguaje" className="form-label">Lenguaje de programación que más maneja</label>
            <select id="select-lenguaje" className="form-select" name="lenguaje" onChange={handleChange}>
              <option selected>PHP</option>
              <option>Java</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="col-md-6">
            <label htmlFor="select-nivel" className="form-label">Nivel en ese lenguaje</label>
            <select id="select-nivel" name="nivel" className="form-select" onChange={handleChange} >
              <option selected>Principiante</option>
              <option>Medio</option>
              <option>Avanzado</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="col-md-6 text-center">
            <label>
              Selecciona una imagen:
              <input type="file" className="form-control" name="image" onChange={uploadPicture} />
            </label>
          </div>
        </div>
        <div className="col-md-2"></div>
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <input type="button" id="boton-registro" className="btn btn-primary rounded-pill" onClick={register} value="Registrarse" />
          </div>
        </div>
      </form>
      <div className={`alert alert-danger ${mostrarAlert ? '' : 'd-none'}`} role="alert">
        Ha habido un error al registrarse
      </div>
    </>
  )

}