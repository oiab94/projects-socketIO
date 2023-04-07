const express = require("express");
require("dotenv").config();

// * Variables
const app = express();

// * Servidor
app.listen(process.env.PORT,() => {
	console.log(`EXPRESS: Se escucha en puerto ${process.env.PORT}`);
});

// Tets de api
app.get("/", (req, res) => {
	res.status(200).send("API esta corriendo");
});