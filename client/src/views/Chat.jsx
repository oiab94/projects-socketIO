import { ChatState } from "../context/ChatProvider";
import { Container, Row, Col } from "react-bootstrap";
import SideBar from "../components/Miscellaneous/SideBar";
import MyChats from "../components/Miscellaneous/MyChats";
import ChatBox from "../components/Miscellaneous/ChatBox";

const Chat = () => {
	const { user } = ChatState();

	return (
		<>
			<Container>
				<Row>
					<Col>{ user && <SideBar /> }</Col>
				</Row>
				
				<Row>
					<Col>{user && <MyChats />}</Col>
					<Col>{ user && <ChatBox /> }</Col>
				</Row>
			</Container>
		</>
	);
};

export default Chat;