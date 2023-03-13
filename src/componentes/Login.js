import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Navegacion } from './Navegacion';
export const Login = () =>{

    const baseUrl="http://localhost/apiAplicacion/"
    const navigate = useNavigate();
    const [credenciales, setCredenciales]=useState({
      usuario: '',
      clave: ''
    });
  
  
    const handleChange=e=>{
      const {name, value}=e.target;
      setCredenciales((prevState)=>({
        ...prevState,
        [name]: value
      }))
    }

    const login = async()=>{
      var f = new FormData();
      f.append("usuario", credenciales.usuario);
      f.append("clave", credenciales.clave);
      f.append("ACTION","LOGIN")
      console.log(f)
      await axios.post(baseUrl, f)
      .then(response=>{
        console.log(response.data)
          if(response.data!=false){
          localStorage.setItem('login',response.data.id)
          localStorage.setItem('nombre',response.data.nombre)
          navigate('/', {
			replace: true,
		/** 	state: {
				logged: true,
				name: credenciales.usuario,
                id: response.data[0].id
			},*/
		});
    }
      })
    }
  
  
  

    return(
        <>    <Navegacion/><div class="col col-md-12">
            <h1>Iniciar sesión</h1>
        </div><form>
                <div class=" justify-content-center">
                    <div class="row">
                        <div class="col col-md-8 p-2">
                            <input type="text" class="form-control mr-sm-2" name="usuario" id="nombre-usuario-login" placeholder="Usuario" onChange={handleChange}/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-md-8 p-2">
                            <input type="password" class="form-control mr-sm-2" name="clave" id="clave-usuario-login" placeholder="Contraseña"  onChange={handleChange}/>
                        </div>
                    </div>
                    <div class="col col-md-8 p-2">
                        <div class="d-flex justify-content-center">
                            <input type="button" class="btn btn-primary" id="boton-login" value="Acceder" onClick={login}/>
                           </div>
                    </div>
                </div>
            </form><div class="alert alert-danger d-none alert-login" role="alert">
                Ha habido un error al iniciar sesión
            </div></>
           
    )
    
}