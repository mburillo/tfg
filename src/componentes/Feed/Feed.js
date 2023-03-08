import React, { useEffect, useState } from 'react';
import { Post } from './Post';
import { Navegacion } from '../Navegacion';
import axios from 'axios';
import {	Link,} from 'react-router-dom';
export const Feed = () => {
  const baseUrl="http://localhost/apiAplicacion/"
  const [data, setData] = useState([])
  
  const getAllPosts = async()=>{
    await axios.get(baseUrl+"?feed=true")
    .then(response=>{
      console.log(response)
     setData(response.data)
    })

  }
 

  useEffect(()=>{
    getAllPosts()
  },[])
    return (
      <><Navegacion />
      <div className="main-body">
         <div className="container-fluid py-3">
        <div className="row d-flex justify-content-center">
   
          <h1 className="text-center">Tu Feed</h1>
          <div className="col-md-3 lg-3">
            <p  style={{ position: 'fixed', top: '50%', width: '100%', zIndex: 999 }}>Probando</p>
          </div>
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
          <div className='col-md-3'>

        
          <div className="d-flex flex-start align-items-center" style={{ position: 'fixed', top: '50%', width: '100%', zIndex: 999 }}>
        
            <p>Probando</p>
    
          
                  <img className="rounded-circle shadow-1-strong me-3"
                    src="" alt="avatar" width="60"
                    height="60" />
                  <div>
                
                 <Link to={`/perfil/2`}><h6 className="fw-bold text-primary mb-1">Nombre</h6></Link> 
                    <p className="text-muted small mb-0">
                     Hola
                    </p>
                  </div>
                </div>
          </div>
          </div>
      </div>
      </div></>
        
    );
  }



