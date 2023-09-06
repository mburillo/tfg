import React from 'react';
import { Link } from 'react-router-dom';
export const CurrentUserMessage = (data) => {
  return (
    <div className="d-flex flex-row justify-content-end">
      <div>
        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">{data.content}</p>
        <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
          {data.username} a las {data.timestamp}</p>
      </div>
      <Link to={`/perfil/${data.user_id}`}><img src={data.profileImage} className="rounded-circle" alt="avatar 3" style={{ width: '50px', height: '50px' }} /></Link>
    </div>
  );
};
