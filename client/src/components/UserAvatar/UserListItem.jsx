import { Container, Col, Row, Image, Button } from "react-bootstrap";

const UserListItem = ({ user, handleFunction }) => {

	return (
		<div className="pt-2">
			<Container
				className="border border-2 d-flex w-100 p-0 search-stack"
				as={Button}
				onClick={handleFunction}
			>
				<Col xs={3} className="w-auto">
					<Image src={user.picture} width="50px" height="50px" roundedCircle />
				</Col>
				<Col xs={9}>
					<Row className="text-start">
						<p className="lh-sm m-0 fw-light">
							<span className="fs-5">{user.name}</span>
							<br />
							<span>
								<b>Email:</b> {user.email}
							</span>
						</p>
					</Row>
				</Col>
			</Container>
		</div>
	);
};

export default UserListItem;