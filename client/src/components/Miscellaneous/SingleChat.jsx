import React from "react";
import { ChatState } from "../../context/ChatProvider";

/*eslint-disable no-unused-vars */
export const SingleChat = ({ fetchAgain, setFetchAgain }) => {
	const { user, selectedChat, setSelectedChat } = ChatState();
	
	return (
		<>
			{selectedChat ? (
				<></>
			) : (
				<span className="fs-2 d-flex align-items-center">Click on a user to start chatting</span>
			)}
		</>
	);
};
