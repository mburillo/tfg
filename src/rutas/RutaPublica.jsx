import { Navigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
export const RutaPublica = ({ children }) => {
	const [isLogged, setState] = useState(false)
	useEffect(() => {
		const loginStatus = localStorage.getItem('login');
		setState(!!loginStatus);
	  }, []);
	  
	return isLogged ? <Navigate to='/' /> : children;
};