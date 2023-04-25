import { useEffect, useState } from "react";
import { ThemeProvider, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, Outlet } from "react-router-dom";

const Home = () => {
	const [isSelected, setIsSelected] = useState(true);
	const navigate = useNavigate();

	// TODO: Si el usuario esta logeado enviarlo a chats

	// Al ingresar la primera vez nos reenvia a login
	useEffect(() => {
		navigate("/login");
	},[]);

	return (
		<ThemeProvider breakpoints={["xl", "lg", "md"]} minBreakpoint="md">
			<Container>
				<Row className="mt-3 border rounded">
					<Col className="d-flex justify-content-center">
						<h1 className="fs">Chat App</h1>
					</Col>
				</Row>

				<Row className="mt-3 border rounded">
					<Row className="justify-content-center p-3">
						<Col
							md={ 5 }
							as={ Button }
							active={ isSelected }
							onClick={() => {
								setIsSelected(!isSelected);
								navigate("/login");
							}}
							variant="outline-light"
							className="rounded-pill me-3" >
							Login
						</Col>
						<Col
							md={ 5 }
							as={ Button }
							active={ !isSelected }
							onClick={() => {
								setIsSelected(!isSelected);
								navigate("/signup");
							}}
							variant="outline-light"
							className="rounded-pill" >
							Sign up
						</Col>
					</Row>
					<Row>
						<Outlet />
					</Row>
				</Row>
			</Container>
		</ThemeProvider>
	);
};

export default Home;
