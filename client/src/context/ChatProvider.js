import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
	const [ user, setUser ] = useState();
	const [selectedChat, setSelectedChat] = useState();
	const [chats, setChats] = useState([]);
	const [notification, setNotification] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem("userInfo"));
		setUser(userInfo);

		// Si el usuario no está logeado redireccionamos
		if(!userInfo)
			navigate("/login");
	},[]);

	return (
		<>
			<ChatContext.Provider
				value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats, notification, setNotification }}
			>
				{children}
			</ChatContext.Provider>
		</>
	);
};
const ChatState = () => {
	return useContext(ChatContext);
};

export {
	ChatProvider,
	ChatState
};