import { Route, Routes } from 'react-router-dom';

import { Login } from '../componentes/Login';
import { Inicio } from '../componentes/Inicio';
import { Registro } from '../componentes/Registro';
import { Perfil } from '../componentes/Perfil';
import { Feed } from '../componentes/Feed/Feed';
import { RutaPrivada } from './RutaPrivada';
import { Navegacion } from '../componentes/Navegacion';

export const Rutas = () => {
	return (

	<Routes>
		
        <Route path='/registro' element={<Registro />} />
		<Route path='/login' element={<Login />} />
		<Route path="/perfil/:idPerfil" element={<Perfil/>} />
		<Route path='/feed' element={<Feed />} />
		<Route index element=
						{
							<RutaPrivada>
								<Inicio />
							</RutaPrivada>
						}
					/>
			
	</Routes>

	);
};