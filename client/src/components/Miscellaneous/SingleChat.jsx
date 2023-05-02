import React from "react";
import { ChatState } from "../../context/ChatProvider";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getSender, getSenderFull } from "../Config/ChatLogics";
import { ProfileModal } from "./ProfileModal";

/*eslint-disable no-unused-vars */
export const SingleChat = ({ fetchAgain, setFetchAgain }) => {
	const { user, selectedChat, setSelectedChat } = ChatState();
	
	return (
		<>
			{selectedChat ? (
				<>
					<div className="mt-3 w-100">
						<div className="d-flex justify-content-between align-items-center">
							<Button
								variant="outline-secondary"
								className="d-inline-flex align-items-center"
								onClick={() => setSelectedChat("")}
							>
								<FontAwesomeIcon
									icon={faArrowLeft}
									style={{ height: "1.5em" }}
								/>
							</Button>
							{!selectedChat.isGroupChat ? (
								<>
									<span className="fs-4">
										{getSender(user, selectedChat.users)}
									</span>
									<ProfileModal
										user={getSenderFull(user, selectedChat.users)}
									/>
								</>
							) : (
								<>
									<span className="fs-4">{selectedChat.chatName.toUpperCase()}</span>
									{/* <UpdateGroupChatModal 
												fetchAgain={ fetchAgain }
												setFetchAgain={ setFetchAgain }
											/> */}
								</>
							)}
							{/* Messages Here */}
						</div>
					</div>
				</>
			) : (
				<span className="fs-2 d-flex align-items-center">
					Click on a user to start chatting
				</span>
			)}
		</>
	);
};
