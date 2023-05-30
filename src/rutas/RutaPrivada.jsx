import { Navigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
export const RutaPrivada = ({ children }) => {
	//const { state } = useLocation();

	//return state?.logged ? children : <Navigate to='/login' />;
	const [isLogged, setState] = useState([])

	useEffect(() => {
		if (localStorage.getItem('login')) {
			setState(true)
		} else {
			setState(false);
		}
	}, []);
	return isLogged ? children : <Navigate to='/login' />;
};