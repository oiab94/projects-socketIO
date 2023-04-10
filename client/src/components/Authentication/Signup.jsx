import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import FieldGroup from "./form/FieldGroup";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [picture, setPicture] = useState({});
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		if(!name || !email || !password || !confirmPassword)
			console.log("Ingrese todos los campos");
		if(password !== confirmPassword)
			console.log("Password incorrectos");

		try {
			const config = {
				header: {
					"Content-type": "application/json",
				},
			};
			const { data } = await axios.post(
				"/api/user/signup",
				{ name, email, password, picture },
				config
			);
			localStorage.setItem("userInfo", JSON.stringify(data));
			setLoading(false);
			navigate("/chats");
		} catch (error) {
			console.log(error);
		}
	};

	const loadPicture = (picture) => {
		setLoading(true);
		
		if(picture === undefined){
			console.log("Lanzar error Imagen invalida");
			return;
		}
 
		if(picture.type === "image/jpeg" || picture.type === "image/png"){
			const data = new FormData();
			
			data.append("file", picture);
			data.append("upload_preset", "projects-mern-chat-app");
			data.append("cloud_name", "projects-mern");
			
			fetch(process.env.REACT_APP_API_UPLOAD, {
				method:"POST",
				body: data,
			})
				.then(res => res.json())
				.then(data => {
					setPicture(data.url.toString());
					console.log(data.url.toString());
					setLoading(false);
				})
				.catch(err => {
					console.log(err);
					setLoading(false);
				});
		} else {
			console.log("Imagenes invalidas");
		}
	};
		
	return (
		<>
			<Form onSubmit={handleSubmit}>
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

				<FieldGroup
					id="profile_picture"
					label="Profile Picture"
					type="file"
					handleChange={({ target }) => loadPicture(target.files[0])}
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

				<Form.Group className="mb-3">
					<Form.Label>Confirm Password</Form.Label>
					<InputGroup>
						<Form.Control
							type={showPassword ? "text" : "password"}
							onChange={({ target }) => setConfirmPassword(target.value)}
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
					<Button
						disabled={loading}
						variant="outline-light"
						className="w-100"
						type="submit"
					>
						{loading ? (
							<Spinner
								as="span"
								animation="border"
								size="sm"
								role="status"
								aria-hidden="true"
							/>
						) : (
							"Sign up"
						)}
					</Button>
				</div>
			</Form>
		</>
	);
};

export default Signup;
