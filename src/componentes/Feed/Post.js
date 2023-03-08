import React from 'react';
import {	Link,} from 'react-router-dom';

export const Post = (datos) => {

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
                  <a href="#!" className="d-flex align-items-center me-3">
                    <i className="far fa-thumbs-up me-2"></i>
                    <p className="mb-0">Likes {datos.nLikes}</p>
                  </a>
                  <a href="#!" className="d-flex align-items-center me-3">
                    <i className="far fa-comment-dots me-2"></i>
                    <p className="mb-0">Comment  {datos.nComentarios}</p>
                  </a>
                  <a href="#!" className="d-flex align-items-center me-3">
                    <i className="fas fa-share me-2"></i>
                    <p className="mb-0">Share  {datos.nReposts}</p>
                  </a>
                </div>
              </div>
              </div>
              </div>
             
    )
}