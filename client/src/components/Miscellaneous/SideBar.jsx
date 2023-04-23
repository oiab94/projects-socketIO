// import { useState } from "react";
import { Button, Container, OverlayTrigger, Tooltip, Dropdown, Image, Offcanvas, Form, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ChatState } from "../../context/ChatProvider";
import { ProfileModal } from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ChatLoading } from "./ChatLoading";
import LaunchToast from "./LaunchToast";
import UserListItem from "../UserAvatar/UserListItem";

const SideBar = () => {
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	// const [loadingChat, setLoadingChat] = useState();
	const [show, setShow] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const { user } = ChatState();
	const navigate = useNavigate();
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const logoutHandler = () => {
		localStorage.removeItem("userInfo");
		navigate("/login");
	};

	const handleSearch = async () => {
		if( !search ){
			setShowToast(true);
			return;
		}

		try {
			setLoading(true);
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				}
			};
			const { data } = await axios.get(`/api/user/getUsers?search=${search}`, config); 

			console.log("SEARCH: ", data);
			setLoading(false);
			setSearchResult(data);
		} catch ({ response }) {
			// TODO: Lanzar error con toast
			console.log(response);
			console.log(searchResult);
		}
	};

	const accessChat = (userId) => {
		console.log("Acces Chat: ", userId);
	};

	return (
		<Container className="d-flex justify-content-between align-items-center border border-1 mt-3 p-0">
			<OverlayTrigger
				placement="bottom"
				overlay={<Tooltip id="button-tooltip-2">Search Users to chat</Tooltip>}
			>
				<Button
					variant="light"
					className="d-inline-flex align-items-center"
					onClick={handleShow}
				>
					<FontAwesomeIcon icon={faMagnifyingGlass} className="pe-3" />
					<strong>Search User</strong>
				</Button>
			</OverlayTrigger>

			<div className="fs-1">Chat app</div>

			<div className="d-flex">
				<Dropdown>
					<Dropdown.Toggle
						className="hide-arrow border-0 round"
						as={Button}
						variant="outline-light"
					>
						<FontAwesomeIcon icon={faBell} style={{height: "1.5em"}} />
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item>Hello</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>

				<Dropdown>
					<Dropdown.Toggle as={Button} variant="outline-light">
						<Image
							src={user.picture}
							roundedCircle
							style={{width: "20px", height: "20px"}}
						/>
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<ProfileModal user={user}>
							<Dropdown.Item>My Profile</Dropdown.Item>
						</ProfileModal>
						<Dropdown.Divider />
						<Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>

			<Offcanvas show={show} onHide={handleClose}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>
						{
							!showToast 
								? "Search Users"
								:	<LaunchToast 
									body="Please enter something in search"
									bg="warning"
									delay={ 3000 }
									show={ showToast } />
						}
					</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<div>
						<Form>
							<Form.Group as={Row}>
								<Form.Control 
									type="text"
									className="me-2" 
									onChange={ ({ target }) => {
										setSearch(target.value);
										setShowToast(false);
									} }
								/>
								<Button as={Col} xs={2} onClick={ handleSearch }>
									Go
								</Button>
							</Form.Group>
						</Form>
						<div>
							{
								loading 
									? <ChatLoading />
									: searchResult.map((user) => 
										<UserListItem
											key={ user._id }
											user={ user }
											handleFunction={() => accessChat(user._id)}
										/>
									)
							}
						</div>
					</div>
				</Offcanvas.Body>
			</Offcanvas>
		</Container>
	);
};

export default SideBar;