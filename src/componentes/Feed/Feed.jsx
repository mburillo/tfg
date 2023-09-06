import React, { useEffect, useState } from 'react';
import { Post } from './Post';
import { PorSeguir } from './PorSeguir';
import { Navegacion } from '../Navegacion';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'


export const Feed = () => {
  const baseUrl = "https://codingtogetherspring-production.up.railway.app/"
  const [data, setData] = useState([])
  const [toFollow, setToFollow] = useState([])



  const getAllPosts = async () => {
    await axios.get(baseUrl + "getFeed/" + localStorage.getItem('login'))
      .then(response => {
        console.log(response.data)
        setData(response.data)
      })
  }

  const getWhoToFollow = async () => {
    await axios.get(baseUrl + "randomUsers/" + localStorage.getItem('login'))
      .then(response => {
        console.log(response)
        setToFollow(response.data)
      })
  }

  const [modalPublicar, setModalPublicar] = useState(false);
  const [comentario, setComentario] = useState({
    id: localStorage.getItem('login'),
    comentario: ''

  });

  const publicarPost = async () => {
    var f = new FormData();
    console.log(comentario.comentario)
    f.append("id", localStorage.getItem('login'));
    f.append("comentario", comentario.comentario);
    await axios.post(baseUrl + "savePost", f)
      .then(response => {
        console.log(response)
        getAllPosts()
        abrirCerrarModalPublicar()
        // getComentarios()
      })
  }

  const cambioComentario = e => {
    const { name, value } = e.target;
    setComentario((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const abrirCerrarModalPublicar = () => {
    setModalPublicar(!modalPublicar);
  }

  useEffect(() => {
    getAllPosts()
  }, [])
  useEffect(() => {
    getWhoToFollow()
  }, [])

  return (
    <><Navegacion />
      <div className="main-body">
        <div className="container-fluid py-3">
          <div className="row d-flex justify-content-center">
            <h1 className="text-center">Tu Feed</h1>
            <div className="col-md-3 lg-3 d-flex justify-content-center align-items-center ">
              <button style={{ position: 'fixed', top: '50%', width: '25%', left: '3%', zIndex: 999, display: 'block' }} type="button" id="boton-abrir-modal-editar" className="btn btn-primary flex-grow-1 rounded-pill" onClick={() => abrirCerrarModalPublicar()}>Publicar</button>
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
              {data.map(post => {
                const reposter = post.repostedByUserIds.find(user => user.followerIds.includes(parseInt(localStorage.getItem('login'))));

                return (
                  <div className="d-flex justify-content-center align-items-center">
                    <Post
                      post_id={post.id}
                      usuario_id={post.user.id}
                      nombre={post.user.username}
                      contenido={post.content}
                      fecha={post.createdAt}
                      imagen={post.user.profileImage}
                      nComentarios={post.replyIds.length}
                      nLikes={post.likeIds.length}
                      nReposts={post.repostedByUserIds.length}
                      nombreReposter={reposter ? reposter.username : ''}
                      idReposter={reposter ? reposter.id : ''}
                    />
                  </div>
                );
              })}
            </div>
            <div className='col-md-3 '>
              <div className="d-flex flex-start align-items-center " style={{ position: 'sticky', top: '50%', width: '50%', zIndex: 999 }}>
                <h3 style={{ position: 'absolute', top: '-40px' }}>A quien seguir</h3>
                {toFollow.map(profile => (
                  <>
                    <PorSeguir
                      imagen={profile.profileImage}
                      nombre={profile.username}
                      id={profile.id}
                    />
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div></>

  );
}



