import React, {useState } from 'react';
import {	Link,} from 'react-router-dom';
import axios from 'axios';
export const Post = (datos) => {
  const baseUrl="http://localhost/apiAplicacion/"
  const [nLikesAct, setNlikes] = useState(parseInt(datos.nLikes));
  const [nRepostsAct, setNreposts] = useState(parseInt(datos.nReposts));

  async function darLike(){
    var f = new FormData()
    f.append("idPost", datos.post_id)
    f.append("idCuenta",localStorage.getItem("login"))
    f.append("ACTION","DAR_LIKE")
    await axios.post(baseUrl, f)
    .then(response=>{
      setNlikes(nLikesAct + parseInt(response.data));
    })
  } 
    
  async function Repost(){
    const baseUrl="http://localhost/apiAplicacion/"
    var f = new FormData()
    f.append("idPost", datos.post_id)
    f.append("idCuenta",localStorage.getItem("login"))
    f.append("ACTION","REPOST")
    await axios.post(baseUrl, f)
    .then(response=>{
      console.log(parseInt(response.data))
      console.log(nLikesAct)
      setNreposts(nRepostsAct + parseInt(response.data));
      console.log(nLikesAct)
    })
  } 

    return(

       
          <div className="col-md-12 col-lg-10 col-xl-8">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-start align-items-center">
                  <img className="rounded-circle shadow-1-strong me-3"
                    src={"data:image/png;base64,"+datos.imagen} alt="avatar" width="60"
                    height="60" />
                  <div>
                    

                 <Link to={`/perfil/${datos.usuario_id}`}><h6 className="fw-bold text-primary mb-1">{datos.nombre}</h6></Link> 
                    <p className="text-muted small mb-0">
                      {datos.fecha}
                    </p>
                  </div>
                </div>
    
                <p className="mt-3 mb-4 pb-2">
                 {datos.contenido}
                </p>
    
                <div className="small d-flex justify-content-start">
                  <a href="#!" onClick={darLike} className="d-flex align-items-center me-3">
                    <i className="far fa-thumbs-up me-2"></i>
                    <p className="mb-0">Likes {nLikesAct}</p>
                  </a>
                  <Link to={`/post/${datos.post_id}`}><a href="#!" className="d-flex align-items-center me-3">
                    <i className="far fa-comment-dots me-2"></i>
                    <p className="mb-0">Comment  {datos.nComentarios}</p>
                  </a></Link> 
                  <a href="#!" onClick={Repost} className="d-flex align-items-center me-3">
                    <i className="fas fa-share me-2"></i>
                    <p className="mb-0">Share  {nRepostsAct}</p>
                  </a>
                  {datos.nombreReposter?  <div className="d-flex align-items-center me-3">
                    <i className="fas fa-share me-2"></i>
                    <p className="mb-0">Compartido por: <Link to={`/perfil/${datos.idReposter}`}> {datos.nombreReposter}</Link></p>
                  </div> : null}
                </div>
              </div>
              </div>
              </div>
             
    )
}