const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const { connection } = await mongoose.connect(
			process.env.MONGO_URI, 
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});

		console.log(`DB: Conexion establecida con MongoDB ${connection.host}`.cyan.underline);
	} catch ({ message }) {
		console.log(`DB: Error ${message}`.red.bold);
		process.exit();
	}
};

module.exports = connectDB;
