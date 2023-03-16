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
       


          {respuestas.map(respuesta => (
              <div className="d-flex justify-content-center align-items-center">
            <><Post
              post_id={respuesta.repostId}
              usuario_id={respuesta.usuario_id}
              nombre={respuesta.nombre}
              contenido={respuesta.contenido}
              fecha={respuesta.fecha}
              imagen={respuesta.imagen}
              nComentarios={null}
              nLikes={null}
              nReposts={null}/></></div>
      		))}
			
        </>
     
     );
  }
      }
      