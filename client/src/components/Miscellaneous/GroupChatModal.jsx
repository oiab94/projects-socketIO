import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ChatState } from "../../context/ChatProvider";
import UserListItem from "../UserAvatar/UserListItem";
import { UserBadgeItem } from "../UserAvatar/UserBadgeItem";

const GroupChatModal = ({ children }) => {
	const [search, setSearch] = useState("");
	const [groupChatName, setGroupChatName] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user, chats, setChats } = ChatState();

	// Modal
	const [showModal, setShowModal] = useState(false);
	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	const handleSearch = async (query) => {
		setSearch(query);
		if(!query)
			return;

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

			setLoading(false);
			setSearchResult(data);
		} catch ({ response }) {
			console.log("GroupChatModal: ", response);
		}
	};

	const handleSubmit = async () => {
		if(!groupChatName || !selectedUsers){
			// TODO: Lanza un toast
			console.log("GroupChat: no se agrego nada");
		}

		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};

			const { data } = await axios.post("/api/chat/groupCreate", {
				name: groupChatName,
				users: JSON.stringify(selectedUsers.map((u) => u._id))
			}, config);

			setChats([data, ...chats]);
			handleClose(false);
			//TODO: Crea un toast que diga que se creo el chat group
		} catch ({ response }) {
			// TODO: Lanza toast
			console.log("GroupChat: ", response);
		}

	};

	const handleGroup = (userToAdd) => {
		if(selectedUsers.includes(userToAdd)){
			// TODO: Muestra un toast diciendo que el usuario ya se encuentra en el grupo
			console.log("Handle Group: User already added" );
			return;
		}
		setSelectedUsers([...selectedUsers, userToAdd]);
	};

	const handleDelete = (deleteUser) => {
		setSelectedUsers(
			selectedUsers.filter(selected => selected._id !== deleteUser._id)
		);
	};

	return (
		<>
			<span onClick={ handleShow }>{ children }</span>

			<Modal 
				centered
				show={ showModal } 
				onHide={ handleClose } >
				<Modal.Header>
					<Modal.Title>Create Group Chat</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form.Control 
						className="mb-3"
						type="text"
						placeholder="Chat Name"
						onChange={({ target }) => setGroupChatName(target.value)}
					/>
					<Form.Control 
						type="text"
						placeholder="Add Users"
						onChange={({ target }) => handleSearch(target.value)}
					/>
					{
						selectedUsers.map( user => {
							return (
								<UserBadgeItem
									key={user._id}
									user={user}
									handleFunction={() => handleDelete(user)}
								/>
							);
						} )
					}
					{
						loading 
							? (
								<div>loading</div>
							) : (
								searchResult
									?.slice(0, 4)
									.map(user => {
										return <UserListItem 
											key={ user._id }
											user={ user }
											handleFunction={ () => handleGroup(user) } />;
									})
							)
					}
				</Modal.Body>

				<Modal.Footer>
					<Button
						onClick={ handleSubmit }
					>
						Create Chat
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export {
	GroupChatModal,
};