const express = require("express");
require("dotenv").config();
const connectDB = require("./configs/mongoose.config");
require("colors");
const userRoutes = require("./routes/user.routes");
const chatRoutes = require("./routes/chat.routes");
const { notFound, errorHandler } = require("./middleware/error.middleware");

// * Variables
const app = express();

// * Servidor
app.listen(process.env.PORT,() => {
	console.log(`EXPRESS: Se escucha en puerto ${process.env.PORT}`.yellow.bold);
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
app.use(notFound);
app.use(errorHandler);