import { CardComponent } from "../components/CardComponent";
import "../static/css/style.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { InputComponent } from "../components/InputComponent";
import { useState } from "react";

const Home = () => {
	const [onTitle, setOnTitle] = useState("");
	const [onDescription, setOnDescription] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(onTitle, onDescription);
		setOnTitle("");
		setOnDescription("");
	};

	return (
		<>
			<Container className="mw-100 vh-100">
				<Row className="align-items-center">
					<Col md={4}>
						<Form onSubmit={handleSubmit}>
							<CardComponent
								title="Add a Note"
								name="form-notas"
								type="text"
								onClick={() => console.log("Button send")}
								placeholder="Write a title"
							>
								<InputComponent
									id="form-title"
									name="title"
									type="text"
									placeholder="Write a title"
									value={ onTitle }
									onChange={({ target }) => setOnTitle(target.value)}
								/>
								<InputComponent
									as="textarea"
									id="form-text-area"
									name="description"
									placeholder="Write a decription"
									value={ onDescription }
									onChange={({ target }) => setOnDescription(target.value)}
									rows={3}
								/>
								<Col sm={12}>
									<Button
										variant="dark"
										type="submit"
										style={{ width: "inherit" }}
									>
										Send
									</Button>
								</Col>
							</CardComponent>
						</Form>
					</Col>
					<Col md={8}>
						<h1>Notas</h1>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export { Home };
