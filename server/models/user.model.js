const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	picture: {
		type: String,
		required: false,
		default:
			"https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
	},
},{ timestamps: true });

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;