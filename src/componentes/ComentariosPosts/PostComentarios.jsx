import { useParams, 	} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {	Link,} from 'react-router-dom';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import axios from 'axios';
import { Navegacion } from '../Navegacion';


import {Post} from '../Feed/Post'

export const PostComentarios =() => {

  const baseUrl="http://localhost/apiAplicacion/"
  const [post, setPost] = useState([])
  const [comentario, setComentario] = useState({comentario:''});
  const [datosCargados, setDatosCargados] = useState(false)
  const [respuestas, setRespuestas] = useState([])
  const params = useParams();

const getPost = async()=>{
    console.log(params.idPost)
    await axios.get(baseUrl+"?idPost="+params.idPost)
    .then(response=>{
      console.log("HOLA ES AQUI")
      setPost(response.data[0])
      setDatosCargados(true)
      console.log(response)
    })
  }

  const cambioComentario=e=>{
    const {name, value}=e.target;
    setComentario((prevState)=>({
      ...prevState,
      [name]: value
    }))
  }
  const guardarComentario = async()=>{
    var f = new FormData();
    console.log(comentario.comentario)
    f.append("idPost",post.post_id)
    f.append("idComentador", localStorage.getItem('login'));
    f.append("comentario", comentario.comentario);
    f.append("ACTION","GUARDAR_RESPUESTA")
    await axios.post(baseUrl, f)
    .then(response=>{
        console.log(response.data)
       // getComentarios()
    })
  }
  
const getRespuestas= async()=>{

    await axios.get(baseUrl+"?idPostComentarios="+params.idPost)
    .then(response=>{
      console.log(response.data)
      setRespuestas(response.data)  
    })
  }
  useEffect(()=>{
    getPost()
  },[])
  useEffect(()=>{
    getRespuestas()
  },[])
  if (!datosCargados) {
    return <div>Cargando...</div>
  }else{
  return (
    <><Navegacion />
    <div className="d-flex justify-content-center align-items-center">
        <Post
        post_id={post.post_id}
        usuario_id={post.usuario_id}
        nombre={post.nombre}
        contenido={post.contenido_post}
        fecha={post.creado_en}
        imagen={post.imagen}
        nComentarios={post.num_comments}
        nLikes={post.num_likes}
        nReposts={post.num_respost} 
        nombreReposter = {post.nombreReposter}   
        idReposter = {post.idReposter}     
        />
    </div>
    <div class="row d-flex justify-content-center mt-100 mb-100">

<div class="col-lg-8">
  <div class="card">
    <div class="card-body p-4">
      <div class="d-flex flex-start w-100">

        <div class="w-100">
          <h5>Respondiendo a {post.nombre}</h5>

          <div class="form-outline">
            <textarea class="form-control" name="comentario"  onChange={cambioComentario}  id="contenido-texto" rows="2"></textarea>
            <label class="form-label" for="textAreaExample">Escribe tu respuesta</label>
          </div>
          <div class="d-flex justify-content-between mt-3">
            <button type="button" class="btn btn-success" id="boton-guardar-comentario" onClick={() => guardarComentario()}>
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
			<div class="col-lg-8">
				<div class="card p-4">
					<div class="comment-widgets" id="comentarios-perfil">
          {respuestas.map(respuesta => (
          <div class="d-flex flex-row comment-row m-t-0">

				  <div class="comment-text w-100">
         
          <Link to={`/perfil/${respuesta.usuario_id}`}>		<h6 class="fs-3 fw-bold"> <img className="rounded-circle shadow-1-strong me-3"
                    src={"data:image/png;base64,"+respuesta.imagen} alt="avatar" width="60"
                    height="60" />{respuesta.nombre}</h6></Link> <span class="m-b-15 d-block">{respuesta.contenido} </span>
					<div class="comment-footer"> <span class="text-muted float-right">{respuesta.fecha}</span> <button type="button" class="btn btn-cyan btn-sm">Edit</button> <button type="button" class="btn btn-success btn-sm">Publish</button> <button type="button" class="btn btn-danger btn-sm">Delete</button> </div>	
        </div>      
			    </div>
      		))}
					</div> 
				</div>
			</div>
		</div>
        </>
     
     );
  }
      }
      