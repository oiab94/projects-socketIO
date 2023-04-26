import { ChatState } from "../../context/ChatProvider";
import { Col, Row, Container } from "react-bootstrap";
import { SingleChat } from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
	/*eslint-disable no-unused-vars */
	const { selectedChat } = ChatState();

	return (
		<Container className="bg-white border rounded h-100">
			<Row className="h-100">
				<Col
					className="d-flex justify-content-center"
					style={{ color: "var(--bs-gray-dark)" }}
				>
					<SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
				</Col>
			</Row>
		</Container>
	);
};

export default ChatBox;