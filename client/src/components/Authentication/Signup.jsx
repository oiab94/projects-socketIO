import { Button, Form, InputGroup } from "react-bootstrap";
import FieldGroup from "./form/InputGroup";
import { useState } from "react";

const Signup = () => {
	const [firstName, setFirstName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [picture, setPicture] = useState([]);
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(firstName, email, password, picture);
	};

	return (
		<>
			<Form onSubmit={ handleSubmit }>
				<FieldGroup
					id="first-name"
					label="First Name"
					type="text"
					placeholder="Enter your name"
					handleChange={({ target }) => setFirstName(target.value)}
				/>

				<FieldGroup
					id="email"
					label="Email"
					type="text"
					placeholder="Enter your email"
					handleChange={ ({ target }) => setEmail(target.value) }
				/>

				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<InputGroup>
						<Form.Control 
							type={showPassword ? "text" : "password"}
							onChange={({ target }) => setPassword(target.value)} />
						<Button
							variant="outline-light"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? "Hide" : "Show"}
						</Button>
					</InputGroup>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Upload your picture</Form.Label>
					<InputGroup>
						<Form.Control 
							type="file"
							onChange={({ target }) => setPicture(target.files)}
						/>
					</InputGroup>
				</Form.Group>
				
				<div className="mb-3">
					<Button
						variant="outline-light"
						className="w-100">Sign Up</Button>
				</div>
			</Form>
		</>
	);
};

export default Signup;
 