import React, { useEffect, useState } from 'react';
import { Post } from './Post';
import { Navegacion } from '../Navegacion';
import axios from 'axios';
import {	Link,} from 'react-router-dom';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'


export const Feed = () => {
  const baseUrl="http://localhost/apiAplicacion/"
  const [data, setData] = useState([])
  const [toFollow, setToFollow] = useState([])

  

  const getAllPosts = async()=>{
    await axios.get(baseUrl+"?feed=true")
    .then(response=>{
      console.log(response)
    setData(response.data)
    })
  }

  const getWhoToFollow = async()=>{
    await axios.get(baseUrl+"?porSeguir=true")
    .then(response=>{
      console.log(response)
    setToFollow(response.data)
    })
  }

  const [modalPublicar, setModalPublicar]= useState(false);
  const [comentario, setComentario]=useState({
      id: localStorage.getItem('login'),
      comentario: ''
  
    });

    const publicarPost = async()=>{
      var f = new FormData();
      console.log(comentario.comentario)
      f.append("id", localStorage.getItem('login'));
      f.append("comentario", comentario.comentario);
      f.append("ACTION","GUARDAR_POST")
      await axios.post(baseUrl, f)
      .then(response=>{
          console.log(response)
          getAllPosts()
          abrirCerrarModalPublicar()
         // getComentarios()
      })
    }

  const cambioComentario=e=>{
      const {name, value}=e.target;
      setComentario((prevState)=>({
        ...prevState,
        [name]: value
      }))
    }

    const abrirCerrarModalPublicar=()=>{
      setModalPublicar(!modalPublicar);
    }

  useEffect(()=>{
    getAllPosts()
  },[])
  useEffect(()=>{
    getWhoToFollow()
  },[])
    return (
      <><Navegacion />
      <div className="main-body">
         <div className="container-fluid py-3">
        <div className="row d-flex justify-content-center">
   
          <h1 className="text-center">Tu Feed</h1>
          <div className="col-md-3 lg-3 d-flex justify-content-center align-items-center ">
        <button style={{ position: 'fixed', top: '50%', width: '25%', zIndex: 999, display: 'block' }} type="button" id="boton-abrir-modal-editar" className="btn btn-primary flex-grow-1" onClick={() => abrirCerrarModalPublicar()}>Publicar</button>
    </div><Modal isOpen={modalPublicar}>
            <ModalHeader>
                Hacer una publicación
            </ModalHeader>
            <ModalBody>
                <div class="col-md-12">
                    <h1>
                        <label htmlFor="inputEmail4" className="form-label">Expresa tus ideas!</label></h1>
                    <textarea class="form-control" name="comentario" onChange={cambioComentario} id="contenido-texto" rows="4"></textarea>
                </div>

            </ModalBody>
            <ModalFooter>
                <button className="btn btn-primary" onClick={() => publicarPost()}>
                    Publicar
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => abrirCerrarModalPublicar()}
                >
                    Cancelar
                </button>
            </ModalFooter>
        </Modal>

          <div className="col-md-6">
          {data.map(post => (
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
          />  
          </div>
          ))}
          </div>
          <div className='col-md-3 '>

        
          <div className="d-flex flex-start align-items-center " style={{ position: 'sticky', top: '50%', width: '50%', zIndex: 999 }}>
        
          <h3 style={{ position: 'absolute', top: '-40px' }}>A quien seguir</h3>
          {toFollow.map(profile => (
                  <>
                 
                    <div className='col-12'>
                    <div style={{ width: '100%' }}>
              <img className="rounded-circle shadow-1-strong me-3"
              src={"data:image/png;base64,"+profile.imagen} alt="avatar" width="60"
              height="60" /><div>

                <Link to={`/perfil/${profile.id}`}><h6 className="fw-bold text-primary mb-1">{profile.nombre}</h6></Link>
                <p className="text-muted small mb-0">
                  Seguir
                </p>
              </div>
              </div>
              </div>
            
              </>
          ))}
                </div>
          </div>
          </div>
      </div>
      </div></>
        
    );
  }



