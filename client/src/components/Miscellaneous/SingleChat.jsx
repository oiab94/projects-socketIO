import React from "react";
import { ChatState } from "../../context/ChatProvider";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getSender, getSenderFull } from "../Config/ChatLogics";
import { ProfileModal } from "./ProfileModal";
import { UpdateChatGroupModal } from "./UpdateGroupChatModal";

/*eslint-disable no-unused-vars */
export const SingleChat = ({ fetchAgain, setFetchAgain }) => {
	const { user, selectedChat, setSelectedChat } = ChatState();
	
	return (
		<>
			{selectedChat ? (
				<Container>
					<Row className="pt-3 mh-100 w-100">
						<Col
							xs={12}
							className="d-flex justify-content-between align-items-center"
						>
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
									<span className="fs-4">
										{selectedChat.chatName.toUpperCase()}
									</span>
									<UpdateChatGroupModal 
										fetchAgain={ fetchAgain }
										setFetchAgain={ setFetchAgain }
									/>
								</>
							)}
						</Col>
					</Row>
					<Row className="border border-2 mt-2 rounded-2" style={{ height: "720px" }}>
						<Col
							className="d-flex justify-content-between align-items-center"
							style={{ backgroundColor: "var(--bs-border-color)" }}
						>
							asd
							{/* Messages Here */}
						</Col>
					</Row>
				</Container>
			) : (
				<span className="fs-2 d-flex align-items-center">
					Click on a user to start chatting
				</span>
			)}
		</>
	);
};
