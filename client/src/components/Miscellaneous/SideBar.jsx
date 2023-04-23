// import { useState } from "react";
import { Button, Container, OverlayTrigger, Tooltip, Dropdown, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ChatState } from "../../context/ChatProvider";
import { ProfileModal } from "./ProfileModal";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
	// const [search, setSearch] = useState("");
	// const [searchResult, setSearchResult] = useState([]);
	// const [loading, setLoading] = useState(false);
	// const [loadingChat, setLoadingChat] = useState();
	const { user } = ChatState();
	const navigate = useNavigate();

	const logoutHandler = () => {
		localStorage.removeItem("userInfo");
		navigate("/login");
	};

	return (
		<Container className="d-flex justify-content-between align-items-center border border-1 mt-3 p-0">
			<OverlayTrigger
				placement="bottom"
				overlay={<Tooltip id="button-tooltip-2">Search Users to chat</Tooltip>}
			>
				<Button variant="light" className="d-inline-flex align-items-center">
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
							width="20px" 
							height="20px" />
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<ProfileModal user={ user }>
							<Dropdown.Item>My Profile</Dropdown.Item>
						</ProfileModal>
						<Dropdown.Divider />
						<Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</Container>
	);
};

export default SideBar;