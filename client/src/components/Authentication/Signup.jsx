import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import FieldGroup from "./form/FieldGroup";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(true);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		try {
			const config = {
				header: {
					"Content-type":"application/json",
				},
			};
			const { data } = await axios.post("/api/user/signup", {name, email, password}, config);

			localStorage.setItem("userInfo", JSON.stringify(data));
			setLoading(false);
			navigate("/chats");
		} catch (error) {
			console.log(error);
		}
		console.log(name, email, password);
	};

	return (
		<>
			<Form onSubmit={ handleSubmit }>
				<FieldGroup
					id="first-name"
					label="First Name"
					type="text"
					placeholder="Enter your name"
					handleChange={({ target }) => setName(target.value)}
				/>

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
					<Button disabled={ loading } variant="outline-light" className="w-100" type="submit">
						{
							loading ? 
								<Spinner
									as="span"
									animation="border"
									size="sm"
									role="status"
									aria-hidden="true"
								/> :
								"Sign up"
						}
					</Button>
				</div>
			</Form>
		</>
	);
};

export default Signup;
 