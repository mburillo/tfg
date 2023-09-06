import { Navigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
export const RutaPrivada = ({ children }) => {
	const [isLogged, setState] = useState([])
	useEffect(() => {
		const loginStatus = localStorage.getItem('login');
		setState(!!loginStatus);
	  }, []);
	  
	return isLogged ? children : <Navigate to='/login' />;
};