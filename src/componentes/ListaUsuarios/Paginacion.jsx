import React from 'react';

export const Paginacion = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div class="d-flex justify-content-center align-items-center">
      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <button onClick={() => paginate(number)} href='!#' className='page-link'>
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

