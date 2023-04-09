const express = require("express");
require("dotenv").config();
const connectDB = require("./configs/mongoose.config");
require("colors");
const userRoutes = require("./routes/user.routes");

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