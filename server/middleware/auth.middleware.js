const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
	let token;

	// console.log(req.headers);
	if(
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	){
		try {
			token = req.headers.authorization.split(" ")[1];

			// Decodificamos el id del token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Obtenemos el usuario sin el password
			req.user = await User.findById(decoded.id).select("-password");
			
			next();
		} catch(error){
			res.status(401);
			throw new Error("Not authorized, token failed");
		}
	}

	if(!token){
		res.status(401);
		throw new Error("Not authorized, no token");
	}
});

module.exports = { protect };