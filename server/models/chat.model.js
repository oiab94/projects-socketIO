const mongoose = require("mongoose");

const chatModel = mongoose.Schema({
	chatName: { type: String, trim: true },
	isGroupChat: { type: Boolean, default: false },
	users: [
		{
			type: mongoose.Schema.Types.ObjectId, // Contiene el ID de un usuario
			ref: "User",		// Hace referencia hacia el modelo User
		},
	],
	latesMessage: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Message",
	},
	groupAdmin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	}
}, { timestamps: true });

const Chat = mongoose.model("Chat", chatModel);

module.exports = {
	Chat,
};

/**
 * Un chat debe contener
 * - Nombre del chat: chatName
 * - Pertene a algun grupo de chat: isGroupChat
 * - Lista de usuarios que pertenecen al chat: users
 * - El último mensaje recibido: latestMessage
 * - Quien es el administrador del grupo: groupAdmin
 */
