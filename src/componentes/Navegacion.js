import React, { useState, useEffect } from 'react';
import {
	Link,
	Outlet,
	useNavigate,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
export const Navegacion = () => {
	const baseUrl="http://localhost/apiAplicacion/"
	const navigate = useNavigate();

	const [id, setID] = useState([])
	const [nombre, setNombre] = useState([])
	const [isLogged, setState] = useState([])
	const [img, setImg] = useState([])
	const [datosCargados, setDatosCargados] = useState(false)
	useEffect(() => {
	  const id = localStorage.getItem('login');
	  setID(id);
	}, []);

	
	useEffect(() => {
	  if(localStorage.getItem('login')){
		setState(true)
		setNombre(localStorage.getItem('nombre'))
	  }else{
		setState(false);
	  }
	}, []);

	const getUsuarioImg = async()=>{
		await axios.get(baseUrl+"?idImagen="+id)
		.then(response=>{
		 	setImg(response.data)
			setDatosCargados(true)
		})
	  }

	useEffect(() => {
		getUsuarioImg()
	  }, [img]);
  

	const onLogout = () => {
		localStorage.removeItem('login')
		navigate('/login', {
			replace: true,
		});
	};

	
    return(
		<>
			
			<header>
				{isLogged ? (
			<nav class="navbar navbar-expand-sm">
				<h1>
					<Link to='/' className="navbar-brand">InfoYobs</Link>
				</h1>
				<div class="container-fluid">
					<div class="collapse navbar-collapse" id="mynavbar">
						<ul class="navbar-nav me-auto">
      				  		<li class="nav-item">
							<Link to={`/`} className="navbar-brand"><span className='username'>Inicio</span></Link>
       					 </li>
							<li class="nav-item">
							<Link to={`/feed`} className="navbar-brand"><span className='username'>Feed</span></Link>
       					 </li>
						</ul>
						<div className='d-flex'>
						<img src={"data:image/png;base64,"+img} alt="" width="50" height="50"  className="rounded-circle"/>
							<Link to={`/perfil/${id}`} className="navbar-brand"><span className='username'>{nombre}</span></Link>
							<Button className='btn-logout rounded-pill' variant="danger" onClick={onLogout}>
								Cerrar sesión
							</Button>
						</div>
					</div>
				</div>
			</nav>
					
				) : (
					<nav class="navbar navbar-expand-sm">							
				<h1>
					<Link to='/' className="navbar-brand">InfoYobs</Link>
				</h1>
				<div class="container-fluid">
					<div class="collapse navbar-collapse" id="mynavbar">
						<ul class="navbar-nav me-auto">
      				  		<li class="nav-item">
								<Link to='/login' className="nav-link">Iniciar sesión</Link>
       					 </li>
							<li class="nav-item">
							<Link to='/registro' className="nav-link">Registrarse</Link>
       					 </li>
						</ul>
						</div>
						</div>
					</nav>
				)}
			</header>

			<Outlet />
		</>
    )
				
    };

