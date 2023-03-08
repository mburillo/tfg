import React, { useEffect, useState } from 'react';
import { Post } from './Post';
import { Navegacion } from './Navegacion';
import axios from 'axios';

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
      <><Navegacion /><div className="main-body">
         <div className="container my-5 py-5">
        <div className="row d-flex justify-content-center">
         {data.map(post => (
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
          ))}
      </div>
      </div>
      </div></>
        
    );
  }



