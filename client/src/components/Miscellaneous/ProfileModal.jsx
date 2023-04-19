import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { Modal } from "react-bootstrap";


const ProfileModal = ({ children, user }) => {
	const [show, setShow] = useState(false);
	
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div>
			{
				children ? (
					<span onClick={ handleShow }>{ children }</span>
				) : (
					<Button variant="outline-light">
						<FontAwesomeIcon icon={faEye} />
					</Button>
				)
			}
			<Modal 
				show={show} 
				onHide={handleClose}>
				<Modal.Header className="justify-content-center">
					<Modal.Title>{ user.name }</Modal.Title>
				</Modal.Header>
				<Modal.Body className="d-flex flex-column align-items-center">
					<Image 
						src={ user.picture }
						alt={ user.name }
						width="150px"
						height="150px"
						roundedCircle />
					<div className="fs-1">Email: { user.email }</div>
				</Modal.Body>
				<Modal.Footer>
					<Button 
						variant="secondary" 
						onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export {
	ProfileModal,
};