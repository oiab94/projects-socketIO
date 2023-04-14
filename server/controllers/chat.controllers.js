const asyncHandlers = require("express-async-handler");
const { Chat } = require("../models/chat.model");
const User = require("../models/user.model");

const chat_access = asyncHandlers(async (req, res) => {
	const { userId } = req.body;

	if(!userId){
		console.log("UserID param not sent with request");
		return res.status(400);
	}

	let isChat = await Chat.find({
		isGroupChat: false,
		// Como $or ahora $and debe ser ambos ciertos
		$and: [
			{ users: { $elemMatch: {$eq: req.user._id} } },
			{ users: { $elemMatch: {$eq: userId} } }
		]
	})
		.populate("users", "-password")
		.populate("latesMessage");

	isChat = await User.populate(isChat, {
		path:"latesMessage.sender",
		select:"name picture email",
	});

	// Si existe un chat entre ambas personas retornamos el primer chat
	if(isChat.length > 0){
		res.send(isChat[0]);
	} else { // Si no existe ningun chat entre las dos creamos un chat nuevo
		let chatData = {
			chatName: "sender",
			isGroupChat: false,
			users: [req.user._id, userId]
		};

		try{
			const createdChat = await Chat.create(chatData);
			const FullChat = await Chat.findOne({
				_id: createdChat._id
			}).populate("users", "-password");

			res.status(200).send(FullChat);
		}catch(error){
			res.status(400);
			throw new Error(error.message);
		}
	}
});

const chat_get = asyncHandlers(async (req, res) => {
	try{
		Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
			.populate("users", "-password")
			.populate("groupAdmin", "-password")
			.populate("latesMessage")
			.sort({ updatedAt: -1 })
			.then(async (results) => {
				results = await User.populate(results, {
					path:"latesMessage.sender",
					select:"name picture email",
				});

				res.status(200).send(results);
			});
	} catch (error){
		throw new Error(error);
	}
});

const group_create = asyncHandlers(async (req, res) => {
	// Chequeamos el request
	if(!req.body.users || !req.body.name)
		return res.status(400).send({message: "Please fill all the fields"});

	let users = JSON.parse(req.body.users);

	if(users.length < 2)
		return res.status(400).send("More than 2 users are required to form a group chat");

	// Agregamos nuestro usuario tambien al grupo
	users.push(req.user);

	// Creamos en nuestra BD
	try {
		const groupChat = await Chat.create({
			chatName: req.body.name,
			users: users,
			isGroupChat: true,
			groupAdmin: req.user
		});

		const fullGroupChat = await Chat.findOne({_id: groupChat._id})
			.populate("users", "-password")
			.populate("groupAdmin", "-password");

		res.status(200).json(fullGroupChat);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

module.exports = {
	chat_access,
	chat_get,
	group_create
};