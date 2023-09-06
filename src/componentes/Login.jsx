import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Navegacion } from './Navegacion';
export const Login = () => {

  const baseUrl = "https://codingtogetherspring-production.up.railway.app/login"
  const navigate = useNavigate();
  const [credenciales, setCredenciales] = useState({
    usuario: '',
    clave: ''
  });
  const [mostrarAlert, setMostrarAlert] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setCredenciales((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const login = async () => {
    var f = new FormData();
    f.append("username", credenciales.usuario);
    f.append("password", credenciales.clave);
    console.log(f)
    await axios.post(baseUrl, f)
      .then(response => {
        console.log(response.data)
        if (response.data != false) {
          localStorage.setItem('login', response.data.id)
          localStorage.setItem('nombre', response.data.username)
          localStorage.setItem('image', response.data.profileImage)
          navigate('/', {
            replace: true,
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
      <div class="col col-md-12 text-center">
        <h1>Iniciar sesión</h1>
      </div>
      <form>
        <div class="d-flex justify-content-center">
          <div class="col col-md-6 p-2">
            <div class="d-flex flex-column align-items-center">
              <input type="text" class="form-control mb-2 mr-sm-2" name="usuario" id="nombre-usuario-login" placeholder="Usuario" onChange={handleChange} />
              <input type="password" class="form-control mb-2 mr-sm-2" name="clave" id="clave-usuario-login" placeholder="Contraseña" onChange={handleChange} />
              <div class="d-flex justify-content-center">
                <input type="button" class="btn btn-primary rounded-pill mx-auto" id="boton-login" value="Acceder" onClick={login} />
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className={`alert alert-danger ${mostrarAlert ? '' : 'd-none'}`} role="alert">
        Ha habido un error al iniciar sesión
      </div></>
  )

}