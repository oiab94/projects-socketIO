import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Chat = () => {
	const [chats, setChats] = useState([]);

	// Obtenemos los chats
	const fetchChats = async () => {
		const { data } = await axios.get("/api/chat");
		
		console.log(data);
		setChats(data);
	};

	// Efectos
	useEffect(() => {
		fetchChats();
	}, []);

	return (
		<>
			<h1>chats</h1>
			{
				chats.map(chat => {
					return <p key={ chat._id }>{ chat.chatName }</p>;
				})
			}
		</>
	);
};

export default Chat;