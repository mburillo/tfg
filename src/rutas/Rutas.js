import { Route, Routes } from 'react-router-dom';

import { Login } from '../componentes/Login';
import { Inicio } from '../componentes/ListaUsuarios/Inicio';
import { Registro } from '../componentes/Registro';
import { Perfil } from '../componentes/Perfil';

import {Prueba } from '../componentes/prueba';

import { Feed } from '../componentes/Feed/Feed';
import { RutaPrivada } from './RutaPrivada';
import { RutaPublica } from './RutaPublica';
import {PostComentarios} from '../componentes/ComentariosPosts/PostComentarios'
import { Navegacion } from '../componentes/Navegacion';

export const Rutas = () => {
	return (

	<Routes>
		
		<Route path='/prueba' element={<Prueba />} />
        <Route path='/registro' element={
		<RutaPublica>
		<Registro />
		</RutaPublica>
		} />
		<Route path='/login' element=
		{<RutaPublica>
		<Login />
		</RutaPublica>
		} />
		<Route path='/post/:idPost' element={<PostComentarios/>}/>
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