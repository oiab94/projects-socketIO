import { useState } from "react";
import { Form, Button, InputGroup, Toast, Row } from "react-bootstrap";
import FieldGroup from "./form/FieldGroup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!email || !password) {
			setIsFormValid(true);
			return;
		}
		
		try {
			const config = {
				headers : {
					"Content-type": "application/json",
				}
			};

			const { data } = await axios.post(
				"api/user/login",
				{ email, password },
				config
			);

			localStorage.setItem("userInfo", JSON.stringify(data));
			navigate("/chats");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<FieldGroup
					id="email"
					label="Email"
					type="text"
					placeholder="Enter your email"
					handleChange={({ target }) => setEmail(target.value)}
				/>

				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<InputGroup>
						<Form.Control
							type={showPassword ? "text" : "password"}
							onChange={({ target }) => setPassword(target.value)}
						/>
						<Button
							variant="outline-light"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? "Hide" : "Show"}
						</Button>
					</InputGroup>
				</Form.Group>

				<div className="mb-3">
					<Button variant="outline-light" className="w-100" type="submit">
						Login
					</Button>
				</div>

				<div className="mb-3">
					<Button variant="outline-light" className="w-100 btn-style">
						Get Guest User Credentials
					</Button>
				</div>
			</Form>

			<Row className="d-flex position-fixed bottom-0 mb-3 justify-content-center">
				<Toast
					onClose={() => setIsFormValid(!isFormValid)}
					show={isFormValid} 
					delay={4000} 
					bg="danger" 
					autohide
					className="p-0">
					<Toast.Header>
						<strong className="me-auto">Credentials Error</strong>
					</Toast.Header>
					<Toast.Body style={{ color: "black" }}>
						<strong>Email or password incorrect</strong>
					</Toast.Body>
				</Toast>
			</Row>
		</>
	);
};

export default Login;