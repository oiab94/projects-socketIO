import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../Config/ChatLogics";
import { ChatState } from "../../context/ChatProvider";
import { Image } from "react-bootstrap";

const ScrollableChat = ({ messages }) => {
	const { user } = ChatState();
	return (
		<ScrollableFeed>
			{
				messages && messages.map((m, index) => {
					return (
						<div key={m._id} style={{ display: "flex" }}>
							{(isSameSender(messages, m, index, user._id) ||
								isLastMessage(messages, index, user._id)) && (
								<Image
									src={m.sender.picture}
									roundedCircle
									style={{
										width: "2.4em",
										height: "2.4em",
									}}
								/>
							)}
							<span
								style={{
									backgroundColor: `${
										m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
									}`,
									borderRadius: "20px",
									padding: "5px 15px",
									maxWidth: "75%",
									marginLeft: isSameSenderMargin(messages, m, index, user._id),
									marginTop: isSameUser(messages, m, index, user._id) ? 3 : 10,
								}}
							>
								{m.content}
							</span>
						</div>
					);
				})
			}
		</ScrollableFeed>
	);
};

export default ScrollableChat;