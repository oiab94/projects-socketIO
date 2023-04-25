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
				
				<Row className="mt-3 mb-3 h-75">
					<Col>{user && <MyChats />}</Col>
					<Col>{ user && <ChatBox /> }</Col>
				</Row>
			</Container>
		</>
	);
};

export default Chat;