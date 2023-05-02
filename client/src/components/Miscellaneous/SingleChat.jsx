import { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Button, Col, Container, Row, Spinner, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getSender, getSenderFull } from "../Config/ChatLogics";
import { ProfileModal } from "./ProfileModal";
import { UpdateChatGroupModal } from "./UpdateGroupChatModal";
import axios from "axios";

/*eslint-disable no-unused-vars */
export const SingleChat = ({ fetchAgain, setFetchAgain }) => {
	const { user, selectedChat, setSelectedChat } = ChatState();
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [newMessage, setNewMessage] = useState("");
	
	const sendMessage = async (event) => {
		if(event.key === "Enter" && newMessage){
			event.preventDefault();
			try {
				const config = {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user.token}`,
					}
				};
				const { data } = await axios.post("/api/message/sendMessage", {
					content: newMessage,
					chatId: selectedChat._id
				}, config);
				console.log(data);
				setNewMessage("");
				setMessages([...messages,  data]);
			} catch (error) {
				console.log("Single chat: ", error);
			}
		}
	};

	const typingHandler = ({ target }) => {
		setNewMessage(target.value);

		// Typing indicator logic
	};
	

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
										fetchAgain={fetchAgain}
										setFetchAgain={setFetchAgain}
									/>
								</>
							)}
						</Col>
					</Row>
					<Row
						className="border border-2 mt-2 rounded-2"
						style={{
							height: "720px",
							backgroundColor: "var(--bs-border-color)",
						}}
					>
						<Col
							className="d-flex justify-content-between align-items-center"
							style={{
								backgroundColor: "var(--bs-border-color)",
								height: "90%",
							}}
						>
							{!loading ? (
								<Spinner
									animation="border"
									style={{
										width: "100px",
										height: "100px",
										alignSelf: "center",
									}}
								/>
							) : (
								<div>{/* messages */}</div>
							)}
						</Col>

						<Form
							onKeyDown={sendMessage}
							style={{ backgroundColor: "var(--bs-border-color)" }}
						>
							<Form.Control
								placeholder="Enter a message.."
								type="text"
								value={ newMessage}
								onChange={typingHandler}
							/>
						</Form>
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
