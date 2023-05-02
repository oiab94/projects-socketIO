import { ChatState } from "../context/ChatProvider";
import { Container, Row, Col } from "react-bootstrap";
import SideBar from "../components/Miscellaneous/SideBar";
import MyChats from "../components/Miscellaneous/MyChats";
import ChatBox from "../components/Miscellaneous/ChatBox";
import { useState } from "react";

const Chat = () => {
	const { user } = ChatState();
	const [fetchAgain, setFetchAgain] = useState(false);


	return (
		<>
			<Container>
				<Row>
					<Col>{user && <SideBar />}</Col>
				</Row>

				<Row className="mt-3 mb-3" style={{ height:"800px" }}>
					<Col xs={5}>{user && <MyChats fetchAgain={fetchAgain} />}</Col>
					<Col xs={7}>{user && <ChatBox fetchAgain={ fetchAgain } setFetchAgain={ setFetchAgain } />}</Col>
				</Row>
			</Container>
		</>
	);
};

export default Chat;