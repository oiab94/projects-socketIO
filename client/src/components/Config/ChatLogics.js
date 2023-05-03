const getSender = (loggedUser, users) => {
	return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

const getSenderFull = (loggedUser, users) => {
	return users[0]._id === loggedUser._id ? users[1] : users[0];
};

const isSameSender = (messages, m, index, userId) => {
	return (
		index < messages.length - 1 && (
			messages[index + 1].sender._id !== m.sender._id ||
			messages[index + 1].sender._id === undefined &&
			messages[index].sender._id !== userId
		)
	);
};

const isLastMessage = (messages, index, userId) => {
	return (
		index === messages.length - 1 &&
		messages[messages.length - 1].sender._id !== userId &&
		messages[messages.length - 1].sender._id
	);
};

const isSameSenderMargin = (messages, m, index, userId) => {
	if(
		index < messages.length - 1 &&
		messages[index + 1].sender._id === m.sender._id &&
		messages[index].sender._id !== userId
	){
		console.log("SameSenderMargin: ", index);
		return 40;
	}
	else if (
		(index < messages.length - 1 &&
		messages[index + 1].sender._id !== m.sender._id &&
		messages[index].sender._id !== userId) ||
		(index === messages.length - 1 && messages[index].sender._id !== userId)
	)
		return 0;
	else return "auto";
};

const isSameUser = (messages, m, index) => {
	return index > 0 && messages[index - 1].sender._id === m.sender._id;
};

export {
	getSender,
	getSenderFull,
	isSameSender,
	isLastMessage,
	isSameSenderMargin,
	isSameUser
};