import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Login } from '../componentes/Login';
import { Inicio } from '../componentes/ListaUsuarios/Inicio';
import { Registro } from '../componentes/Registro';
import { Perfil } from '../componentes/Perfil';
import { Feed } from '../componentes/Feed/Feed';
import { RutaPrivada } from './RutaPrivada';
import { RutaPublica } from './RutaPublica';
import { PostComentarios } from '../componentes/ComentariosPosts/PostComentarios'
import { Navegacion } from '../componentes/Navegacion';
import { PrivateChat } from '../componentes/Chat/PrivateChat';
export const Rutas = () => {
	return (
		<Routes>
			<Route path='/chat' element={<PrivateChat />} />
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
			<Route path='/post/:idPost' element={<PostComentarios />} />
			<Route path="/perfil/:idPerfil" element={<Perfil />} />
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