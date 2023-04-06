import express from "express";
import * as dotenv from "dotenv";
import testRoute from "./routes/test.route";
import { Server as WebSocketServer } from "socket.io";
import http from "http";

// * VARIABLES
const app = express(); // Configuramos express
const server = http.createServer(app); // Servimos las configuraciones de express a nuestro servidor, a partir de aqui la escucha al servidor se realiza con http
const io = new WebSocketServer(server); // Creamos la conexion de sockets que utiliza nuestro servidor

// * CONFIGURACIONES
dotenv.config();
server.listen(
	process.env.PORT,
	() => {
		console.log(`Express-> Se escucha en el puerto ${process.env.PORT}`);
	}
);
io.on(
	"connection",
	() => {
		console.log("Socket: Estableciendo nueva conexion");
	}
);

// * RUTAS
app.use(testRoute);