import { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ChatLoading } from "./ChatLoading";
import { getSender } from "../Config/ChatLogics";
import { GroupChatModal } from "./GroupChatModal";

const MyChats = () => {
	const [loggedUser, setLoggedUser] = useState();
	const { user, chats, setChats, setSelectedChat } = ChatState();

	const fetchChats = async () => {
		try {
			const config = {
				headers :{
					Authorization: `Bearer ${user.token}`,
				}
			};
			const { data } = await axios.get("/api/chat", config);
			console.log("Response:", data);
			setChats(data);
		} catch ({ response }) {
			console.log("My Chats: ", response);
		}
	};

	useEffect(() => {
		setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
		fetchChats();
		console.log("MyChats:", loggedUser);
		console.log(chats);
	},[]);

	return (
		<Container className="border h-100" fluid>
			<Row>
				<Col className="d-flex justify-content-between align-items-center">
					<span className="fs-1">My Chats</span>
					<GroupChatModal>
						<Button variant="outline-light">
							<strong>New Group Chat</strong>
							<FontAwesomeIcon icon={faPlus} className="ps-3" />
						</Button>
					</GroupChatModal>
				</Col>
			</Row>

			<Row className="mx-1">
				{
					chats 
						? chats.map(( chat ) => {
							return (
								<Button 
									key={ chat._id }
									xs={ 12 }
									className="d-flex mb-2"
									variant="outline-light"
									onClick={ () => setSelectedChat( chat ) } >
									{
										!chat.isGroupChat
											? getSender(loggedUser, chat.users)
											: chat.chatName
									}
								</Button>);
						})
						: <ChatLoading />
				}
			</Row>
		</Container>
	);
};

export default MyChats;