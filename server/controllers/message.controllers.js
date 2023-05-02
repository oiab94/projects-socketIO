const asyncHandlers = require("express-async-handler");
const { Message } = require("../models/message.model");
const User = require("../models/user.model");
const { Chat } = require("../models/chat.model");

const sendMessage = asyncHandlers(async (req, res) => {
	const { content, chatId } = req.body;

	if(!content || !chatId){
		console.log("Invalid data passed into request");
		return res.status(400);
	}

	let newMessage = {
		sender: req.user._id,
		content: content,
		chat: chatId,
	};

	try {
		let message = await Message.create(newMessage);

		message = await message.populate("sender", "name picture");
		message = await message.populate("chat");
		message = await User.populate(message, {
			path:"chat.users",
			select:"name picture email",
		});

		await Chat.findByIdAndUpdate(req.body.chatId, {
			latesMessage: message,
		});

		res.json(message);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

const allMessage = asyncHandlers(async (req, res) => {
	try {
		const messages = await Message.find({chat: req.params.chatId})
			.populate("sender", "name picture email")
			.populate("chat");

		res.json(messages);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

module.exports = {
	sendMessage,
	allMessage
};