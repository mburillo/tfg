import React, { useState, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import axios from 'axios';
export const Post = (datos) => {
  const baseUrl = "https://codingtogetherspring-production.up.railway.app"
  const [nLikesAct, setNlikes] = useState(parseInt(datos.nLikes));
  const [nRepostsAct, setNreposts] = useState(parseInt(datos.nReposts));
  const [fechaFormateada, setFechaFormateada] = useState('');

  useEffect(() => {
    const dateObject = new Date(datos.fecha);
    const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const fechaLegible = dateObject.toLocaleDateString('es-ES', opciones);
    setFechaFormateada(fechaLegible);
  }, [datos]);
  
  async function darLike() {
    var f = new FormData()
    f.append("idPost", datos.post_id)
    f.append("idCuenta", localStorage.getItem("login"))
    await axios.post(baseUrl + "likePost", f)
      .then(response => {
        setNlikes(parseInt(response.data));
      })
  }

  async function Repost() {
    var f = new FormData()
    f.append("idPost", datos.post_id)
    f.append("idCuenta", localStorage.getItem("login"))
    await axios.post(baseUrl + "repost", f)
      .then(response => {
        setNreposts(parseInt(response.data));
      })
  }
  const [hovereado, setHovereado] = useState(false);

  const toggleHover = () => {
    setHovereado(!hovereado);
  };
  return (
    <div className="col-md-12 col-lg-10 col-xl-8">
      <div
        className={
          hovereado
            ? "card shadow-lg"
            : "card"
        }
        onMouseEnter={() => toggleHover()}
        onMouseLeave={() => toggleHover()}>
        <div className="card-body">
          <div className="d-flex flex-start align-items-center">
            <img className="rounded-circle shadow-1-strong me-3"
              src={datos.imagen} alt="avatar" width="60"
              height="60" />
            <div>
              <Link to={`/perfil/${datos.usuario_id}`}><h6 className="fw-bold text-primary mb-1">{datos.nombre}</h6></Link>
              <p className="text-muted small mb-0">
                {fechaFormateada}
              </p>
            </div>
          </div>
          <p className="mt-3 mb-4 pb-2">
            {datos.contenido}
          </p>
          <div className="small d-flex justify-content-start">
            {datos.nLikes != null ? <><a href="#!" onClick={darLike} className="d-flex align-items-center me-3">
              <i className="far fa-thumbs-up me-2"></i>
              <p className="mb-0">Likes {nLikesAct}</p>
            </a><Link to={`/post/${datos.post_id}`}><a href="#!" className="d-flex align-items-center me-3">
              <i className="far fa-comment-dots me-2"></i>
              <p className="mb-0">Comment  {datos.nComentarios}</p>
            </a></Link><a href="#!" onClick={Repost} className="d-flex align-items-center me-3">
                <i className="fas fa-share me-2"></i>
                <p className="mb-0">Share  {nRepostsAct}</p>
              </a></> : null}
            {datos.nombreReposter ? <div className="d-flex align-items-center me-3">
              <i className="fas fa-share me-2"></i>
              <p className="mb-0">Compartido por: <Link to={`/perfil/${datos.idReposter}`}> {datos.nombreReposter}</Link></p>
            </div> : null}
          </div>
        </div>
      </div>
    </div>
  )
}