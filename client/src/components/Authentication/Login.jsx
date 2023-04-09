import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import FieldGroup from "./form/FieldGroup";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);


	const handleSubmit = () => {
		console.log(email, password);
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
					<Button variant="outline-light" className="w-100">
						Login
					</Button>
				</div>

				<div className="mb-3">
					<Button variant="outline-light" className="w-100 btn-style">
						Get Guest User Credentials
					</Button>
				</div>
			</Form>
		</>
	);
};

export default Login;