import React from 'react';
import { Link } from 'react-router-dom';
export const OtherUserMessage = (data) => {
  return (
    <div className="d-flex flex-row justify-content-start mb-4">
      <Link to={`/perfil/${data.user_id}`}><img
        src={data.profileImage}
        alt="avatar 3"
        className="rounded-circle" style={{ width: '50px', height: '50px' }}
      /></Link>
      <div>
        <p className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: '#f5f6f7' }}>
          {data.content}
        </p>
        <p className="small ms-3 mb-3 rounded-3 text-muted">{data.username} a las {data.timestamp}</p>
      </div>
    </div>
  );
};
