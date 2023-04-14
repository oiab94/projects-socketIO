const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const generateToken = require("../configs/token.config");

const registerUser = asyncHandler(
	async (req, res) => {
		const { name, email, password, picture } = req.body;
	
		// Verificar si todos los datos fueron ingresados
		if(!name || !email || !password){
			res.status(400);
			throw new Error("Please enter all the fields");
		}

		// Verificamos si existe el usuario
		const userExists = await User.findOne({ email });

		if(userExists) {
			res.status(400);
			throw new Error("User already exist");
		}

		// Creamos un nuevo usuario
		const user = await User.create({
			name,
			email,
			password,
			picture
		});

		if(user){
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				picture: user.picture,
				token: generateToken(user._id)
			});
		} else {
			res.status(400);
			throw new Error("Failed to create user");
		}
	}
);

const authUser = asyncHandler(
	async (req, res) => {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if(user && (await user.matchPassword(password))){
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				picture: user.picture,
				token: generateToken(user._id)
			});
		}	else {
			res.status(401);
			throw new Error("Invalid email or password");
		}
	}
);

// * /api/user/getUsers?search=<algunNombre>
const allUsers = asyncHandler(async (req, res) => {
	const keyword = req.query.search ? {
		// Podemos buscar a una persona por su nombre o email
		$or: [
			{ name: { $regex: req.query.search, $options: "i" } },
			{ email: { $regex: req.query.search, $options: "i" } },
		]
	} : {};

	// * Busca todos los usuarios que contenga la palabra indicada
	const users = await User.find(keyword);

	res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
