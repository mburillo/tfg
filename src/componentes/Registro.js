import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Navegacion } from './Navegacion';

export const Registro = () =>{

    const baseUrl="http://localhost/apiAplicacion/"
    const [data, setData] = useState([])
    const navigate = useNavigate();
    const [credenciales, setCredenciales]=useState({
      usuario: '',
      clave: '',
      lenguaje: 'PHP',
      nivel:'Principiante',
      image:''  
    });
  
    const [picture, setPicture] = useState({});

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

    const register = async()=>{
      var f = new FormData();
      f.append("usuario", credenciales.usuario);
      f.append("clave", credenciales.clave);
      f.append("lenguaje", credenciales.lenguaje);
      f.append("nivel",credenciales.nivel)
      f.append("imagen",picture.pictureAsFile)
      f.append("ACTION","REGISTER")
      for (var key of f.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }
      await axios.post(baseUrl, f)
      .then(response=>{
          console.log(response.data)
          if(response.data!=null){
            navigate('/', {
                replace: true,
                state: {
                    logged: true,
                    name: credenciales.usuario,
                },
            });
          }
      })
    }
  
  
  

    return(
        <>    <Navegacion/><h1>Registro</h1>
		<form class="row g-3" encType="multipart/form-data">
			<div class="col-md-6">
			  <label htmlFor="inputEmail4"  className="form-label" >  Nombre de usuario</label>
			  <input type="text" class="form-control" name="usuario" id="nombre-usuario-registro" onChange={handleChange}/>
			</div>
			<div class="col-md-6">
			  <label htmlFor="inputPassword4" className="form-label"  >Contraseña</label>
			  <input type="password" class="form-control" name="clave"  id="clave-usuario-registro" onChange={handleChange}/>
			</div>
			<div class="col-md-6">
			  <label htmlFor="inputState" className="form-label"  >Lenguaje de programación que más maneja</label>
			  <select id="select-lenguaje" class="form-select" name="lenguaje"  onChange={handleChange}>
              <option selected>PHP</option>
			  <option>Java</option>
			  </select>
			</div>
			<div class="col-md-6">
			<label htmlFor="inputState" className="form-label">Nivel en ese lenguaje</label>
			<select id="select-nivel" name="nivel" class="form-select" onChange={handleChange} >
			  <option selected>Principiante</option>
			  <option>Medio</option>
			  <option>Avanzado</option>
			</select>
			</div>
			<div class="col-md-4"></div>
			<div class="col-md-6">
            <label>
        Selecciona una imagen:
        <input type="file" name="image" onChange={uploadPicture} />
      </label>

			</div>
			<div class="col-md-2"></div>
			<div class="col-12">
				<div class="d-flex justify-content-center">
			  <input type="button" id="boton-registro"class="btn btn-primary rounded-pill" onClick={register} value="Registrarse"></input>
			  </div>
			</div>
		  </form>

		  <div class="alert alert-danger d-none alert-registro" role="alert">
			Ha habido un error al registrarse
		</div></>
           
    )
    
}