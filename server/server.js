import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import testRoute from "./routes/test.route";
import { Server as WebSocketServer } from "socket.io";
import http from "http";

// * VARIABLES
// Configuramos express
const app = express();

// Servimos las configuraciones de express a nuestro servidor, a partir de aqui la escucha al servidor se realiza con http
const server = http.createServer(app);

// Creamos la conexion a nuestro socket, además este tiene configuraciones cors para permitir que solo nuestro FrontEnd se conecte
const io = new WebSocketServer(
	server, {
		cors : {
			origin: process.env.URL,
			credentials: true,
		}
	}
); // Creamos la conexion de sockets que utiliza nuestro servidor

// * CONFIGURACIONES
server.listen(
	process.env.PORT,
	() => {
		console.log(`EXPRESS: Se escucha en el puerto ${process.env.PORT}`);
	}
);

io.on(
	"connection",
	(socket) => {
		console.log(`SOCKET: Nueva conexion establecida con ${socket.id}`);
	}
);

// * RUTAS
app.use(testRoute);