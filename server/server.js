import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import testRoute from "./routes/test.route";
import { connection } from "./controllers/io.controller";

// * VARIABLES
const app = express();
const httpServer = createServer(app);
const corsOptions = {
	origin:process.env.URL,
	credentials:true,
};
const io = new Server(
	httpServer,
	{ cors: corsOptions }
);

// Ponemos a la escucha nuestro servidor con SocketIO y Express
httpServer.listen(
	process.env.PORT,
	() => {
		console.log(`SERVER: Se escucha en el puerto ${process.env.PORT}`);
	}
);

// * RUTAS
app.use(testRoute);

// * SOCKET
connection(io);