import { useState } from "react";
import { ThemeProvider, Container, Row, Col, Button } from "react-bootstrap";

const Home = () => {
	const [isSelected, setIsSelected] = useState(true);

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
							onClick={ () => setIsSelected(!isSelected) }
							variant="outline-dark"
							className="rounded-pill me-3" >
							Login
						</Col>
						<Col
							md={ 5 }
							as={ Button }
							active={ !isSelected }
							onClick={ () => setIsSelected(!isSelected) }
							variant="outline-dark"
							className="rounded-pill" >
							Sign up
						</Col>
					</Row>
				</Row>
			</Container>
		</ThemeProvider>
	);
};

export default Home;
