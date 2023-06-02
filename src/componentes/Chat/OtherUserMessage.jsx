import React from 'react';
import {Link} from 'react-router-dom';
export const OtherUserMessage = (data) => {
  return (
    <div className="d-flex flex-row justify-content-start mb-4">
      <img
        src={"http://localhost:8080/images/" + data.profileImage}
        alt="avatar 3"
        style={{ width: '40px', height: '100%' }}
      />
      <div>
        <p className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: '#f5f6f7' }}>
          {data.content}
        </p>
        <p className="small ms-3 mb-3 rounded-3 text-muted">00:13</p>
      </div>
    </div>
  );
};
