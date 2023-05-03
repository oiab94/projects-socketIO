import { useState, useEffect } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Button, Col, Container, Row, Spinner, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getSender, getSenderFull } from "../Config/ChatLogics";
import { ProfileModal } from "./ProfileModal";
import { UpdateChatGroupModal } from "./UpdateGroupChatModal";
import ScrollableChat from "./ScollableChat";
import axios from "axios";
import { io } from "socket.io-client";
import Lottie from "lottie-react";
import animationData from "../../static/animations/lottie-hands-typing-on-keyboard.json";

/*eslint-disable no-unused-vars */
const ENDPOINT = process.env.REACT_APP_API_URL;
let socket, selectedChatCompare;

export const SingleChat = ({ fetchAgain, setFetchAgain }) => {
	const { user, selectedChat, setSelectedChat } = ChatState();
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [newMessage, setNewMessage] = useState("");
	const [socketConnected, setSocketConnected] = useState();
	const [typing, setTyping] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	
	const fetchMessages = async () => {
		if(!selectedChat) return;

		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			setLoading(true);

			const { data } = await axios.get(
				`/api/message/getMessages/${selectedChat._id}`,
				config
			);
			
			setMessages(data);
			setLoading(false);
			socket.emit("join chat", selectedChat._id);	// Cuando hacemos click en chat le indicamos a socket que nos vamos a conectar con ese grupo
		} catch (error) {
			console.log("Fetch Message: ", error);
		}
	};

	useEffect(() => {
		fetchMessages();

		selectedChatCompare = selectedChat;
	}, [selectedChat]);
	
	// Conecta nuestro socket client con el backend
	useEffect(() => {
		socket = io(ENDPOINT);
		socket.emit("setup", user);
		socket.on("connected", () => setSocketConnected(true));
		socket.on("typing", () => setIsTyping(true));
		socket.on("stop typing", () => setIsTyping(false));
	}, []);
	
	useEffect(() => {
		socket.on("message recieved", (newMessageReceived) => {
			if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
				// Indica una notificacion
			} else {
				setMessages([...messages, newMessageReceived]);
			}
		});
	});
	

	const sendMessage = async (event) => {
		if(event.key === "Enter" && newMessage){
			socket.emit("stop typing", selectedChat._id);
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
				setNewMessage("");
				setMessages([...messages,  data]);
				socket.emit("new message", data);
			} catch (error) {
				console.log("Single chat: ", error);
			}
		}
	};

	const typingHandler = ({ target }) => {
		setNewMessage(target.value);

		// Typing indicator logic
		if(!socketConnected) return;

		if(!typing){
			setTyping(true);
			socket.emit("typing", selectedChat._id);
		}

		let lastTypingTime = new Date().getTime();
		let timerLength = 3000;

		setTimeout(() => {
			var timeNow = new Date().getTime();
			var timeDiff = timeNow - lastTypingTime;

			if(timeDiff >= timerLength && typing){
				socket.emit("stop typing", selectedChat._id);
				setTyping(false);
			}
		}, timerLength);
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
										fetchMessages={fetchMessages}
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
							className="d-flex justify-content-start align-items-end"
							style={{
								backgroundColor: "var(--bs-border-color)",
								height: "90%",
							}}
						>
							{loading ? (
								<Spinner
									animation="border"
									style={{
										width: "100px",
										height: "100px",
										alignSelf: "center",
									}}
								/>
							) : (
								<div style={{width:"100%"}}>
									<ScrollableChat messages={messages} />
								</div>
							)}
						</Col>

						<Form
							onKeyDown={sendMessage}
							style={{ backgroundColor: "var(--bs-border-color)" }}
						>
							{
								isTyping 
									? <Lottie 
										style={{
											display:"flex", 
											height:"50px", 
											width:"50px", 
											alignItems:"self-start",
											marginLeft:0,
											marginBottom:0
										}}
										animationData={animationData}	
									/> 
									: <></>
							}
							<Form.Control
								placeholder="Enter a message.."
								type="text"
								value={newMessage}
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
