const express = require("express");
require("dotenv").config();
const connectDB = require("./configs/mongoose.config");
require("colors");
const userRoutes = require("./routes/user.routes");
const chatRoutes = require("./routes/chat.routes");
const messageRoutes = require("./routes/message.routes");
const { notFound, errorHandler } = require("./middleware/error.middleware");

// * Variables
const app = express();

// * Servidor
const server = app.listen(process.env.PORT,() => {
	console.log(`EXPRESS: Se escucha en puerto ${process.env.PORT}`.yellow.bold);
});

// * Socket io
const io = require("socket.io")(server, {
	pingTimeout: 60000, // Va a realizar la conexion por 60 segundos si no se realiza nada
	cors: {
		origin: "http://localhost:3000",
	}
});

io.on("connection", (socket) => {
	console.log("Connected to socket.io");

	socket.on("setup", (userData) => {
		socket.join(userData._id);
		console.log("Connected with: ", userData._id);
		socket.emit("connected");
	});

	socket.on("join chat", (room) => {
		socket.join(room);
		console.log("User joined on room: ", room);
	});

	socket.on("new message", (newMessageRecieved) => {
		var chat = newMessageRecieved.chat;

		if(!chat.users)
			return console.log("Chat.users not defined");
		
		// Si el chat es conmigo mismo no hacemos nada, si el chat es con otro user enviamos el mensaje 
		chat.users.forEach(user => {
			if(user._id == newMessageRecieved.sender._id) return;
			
			socket.in(user._id).emit("message recieved", newMessageRecieved);
		});
	});

	socket.off("setup", (userData) => {
		console.log("User disconnected");
		socket.leave(userData._id);
	});

	// Indica si alguien esta escribiendo
	socket.on("typing", (room) => socket.in(room).emit("typing"));
	socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
});

// * Base de datos
connectDB();

// * Middleware
app.use(express.json());

// Tets de api
app.get("/", (req, res) => {
	res.status(200).send("API is running");
});

// * Rutas de API
app.use("/api/user", userRoutes); 
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);