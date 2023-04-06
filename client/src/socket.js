import { io } from "socket.io-client";

// * Permite la conexion con nuestro socket del lado del server
// * Similar a axios debemos realizar las configuraciones cors
const socket = io(
	process.env.REACT_APP_API_URL, 
	{
		autoConnect: false,
		withCredentials: true,
	}
);

export default socket;