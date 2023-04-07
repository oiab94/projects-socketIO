const express = require("express");
require("dotenv").config();
const { chats } = require("./data/data");

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
app.get("/api/chat", (req, res) => {
	res.status(200).send(chats);
});