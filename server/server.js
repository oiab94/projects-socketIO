import express from "express";
import * as dotenv from "dotenv";
import testRoute from "./routes/test.route";

// * VARIABLES
const app = express();

// * CONFIGURACIONES
dotenv.config();
app.listen(
	process.env.PORT,
	() => {
		console.log(`Express-> Se escucha en el puerto ${process.env.PORT}`);
	}
);

// * RUTAS
app.use(testRoute);