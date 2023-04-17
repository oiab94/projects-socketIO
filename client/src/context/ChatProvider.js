import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
	const [ user, setUser ] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem("userInfo"));
		setUser(userInfo);
		console.log(!userInfo);

		// Si el usuario no está logeado redireccionamos
		if(!userInfo)
			navigate("/login");
	},[navigate]);

	return (
		<>
			<ChatContext.Provider value={{ user, setUser }}>
				{ children }
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