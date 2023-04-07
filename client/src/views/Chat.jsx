import { useEffect } from "react";
import axios from "axios";

const Chat = () => {
	// Obtenemos los chats
	const fetchChats = async () => {
		const { data } = await axios.get("/api/chat");
		
		console.log(data);
	};

	// Efectos
	useEffect(() => {
		fetchChats();
	}, []);

	return (
		<>
			<h1>Chat Page</h1>
		</>
	);
};

export default Chat;