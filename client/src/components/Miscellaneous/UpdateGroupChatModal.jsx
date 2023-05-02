import { useState } from "react";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { ChatState } from "../../context/ChatProvider";
import { UserBadgeItem } from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";
import axios from "axios";


/*eslint-disable no-unused-vars */
const UpdateChatGroupModal = ({ fetchAgain, setFetchAgain }) => {
	const [groupChatName, setGroupChatName] = useState();
	const [search, setSearch] = useState();
	const [searchResult, setSearchResult] = useState();
	const [loading, setLoading] = useState(true);
	const [renameLoading, setRenameLoading] = useState(false);
	const { selectedChat, setSelectedChat, user } = ChatState();

	// Modal
	const [showModal, setShowModal] = useState(false);
	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	const handleRemove = async (user1) => {
		if (selectedChat.groupAdmin._id !== user._id && 
				user1._id !== user._id) {
			console.log("GroupChatModal: ONLY ADMINS CAN REMOVE");
			return;
		}

		try {
			setLoading(true);
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.put(
				"/api/chat/groupRemoveTo",
				{
					chatId: selectedChat._id,
					userId: user1._id,
				},
				config
			);

			user1._id === user._id 
				? setSelectedChat()
				: setSelectedChat(data);
				
			setFetchAgain(!fetchAgain);
			setLoading(false);
			
		} catch ({ response }) {
			console.log("GroupChatModal: ", response);
		}
	};
	
	const handleRename = async ({ target }) => {
		if(!groupChatName) return;

		try {
			setRenameLoading(true);

			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};

			const { data } = await axios.put("/api/chat/groupRename", {
				chatId: selectedChat._id,
				chatName: groupChatName,
			}, config);
			setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			setRenameLoading(false);

		} catch (error) {
			console.log("UpdateGroupChat: ", error.response);
			setRenameLoading(false);
			setGroupChatName("");
		}
	};
	
	const handleSearch = async (query) => {
		setSearch(query);
		if (!query) return;

		try {
			setLoading(true);

			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.get(
				`/api/user/getUsers?search=${search}`,
				config
			);

			console.log("User Search: ", data);
			setLoading(false);
			setSearchResult(data);
		} catch ({ response }) {
			console.log("GroupChatModal: ", response);
		}
	};

	const handleAddUser = async (user1) => {
		if(selectedChat.users.find((u) => u._id === user1._id)){
			console.log("GroupChatModal: USER ALREADY IN GROUP");
			return;
		}

		if(selectedChat.groupAdmin._id !== user._id){
			console.log("GroupChatModal: ONLY ADMINS CAN ADD");
			return;
		}

		try {
			setLoading(true);
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.put("/api/chat/groupAddTo", {
				chatId: selectedChat._id,
				userId: user1._id
			}, config);

			setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			setLoading(false);
		} catch ({ response }) {
			console.log("GroupChatModal: ", response);
		}
	};

	return (
		<>
			<Button variant="outline-secondary" onClick={handleShow}>
				<FontAwesomeIcon icon={faEye} />
			</Button>

			<Modal centered show={showModal} onHide={handleClose}>
				<Modal.Header className="justify-content-center">
					<Modal.Title>{selectedChat.chatName}</Modal.Title>
				</Modal.Header>

				<Modal.Body as={Container}>
					<Row>
						<Col>
							{
								selectedChat.users.map((u) => {
									return (
										<UserBadgeItem
											key={u._id}
											user={u}
											handleFunction={() => handleRemove(u)}
										/>
									);
								})
							}
						</Col>
					</Row>
					<Row className="mt-3">
						<Col className="d-flex">
							<Form.Control
								className="mb-3 me-3"
								type="text"
								placeholder="Chat Name"
								onChange={({ target }) => setGroupChatName(target.value)}
							/>
							<Button style={{ height: "fit-content" }} onClick={handleRename}>
								Update
							</Button>
						</Col>
					</Row>
					<Row>
						<Col className="d-flex">
							<Form.Control
								className="mb-3 me-3"
								type="text"
								placeholder="Add Users to Group"
								onChange={({ target }) => handleSearch(target.value)}
							/>
						</Col>
					</Row>
					<Row>
						{
							loading ? (
								<div>LOADING...</div>
							) : (
								searchResult?.map((user) => {
									return (
										<UserListItem
											key={user._id}
											user={user}
											handleFunction={() => handleAddUser(user)}
										/>
									);
								})
							)
						}
					</Row>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="danger" onClick={() => handleRemove(user)}>
						Leave Group
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export { UpdateChatGroupModal };
