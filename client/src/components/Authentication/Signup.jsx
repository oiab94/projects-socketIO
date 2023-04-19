import { Button, Form, InputGroup, Spinner, Toast } from "react-bootstrap";
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
	const [textError, setTextError] = useState("");
	const [isFormValid, setIsFormValid] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		if(!name || !email || !password || !confirmPassword){
			setIsFormValid(true);
			setTextError("All the fields are required");
			return;
		}
		if(password !== confirmPassword){
			setIsFormValid(true);
			setTextError("Passwords are not equal");
			return;
		}
		
		setLoading(true);
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
			setIsFormValid(true);
			setTextError("Insert a picture");
			setLoading(false);
			console.log("Form Error: ", error);
		}
	};

	const loadPicture = (picture) => {
		if(picture === undefined){
			setIsFormValid(true);
			setTextError("Please insert a picture");
			return;
		}
		
		if(picture.type === "image/jpeg" || picture.type === "image/png"){
			setLoading(true);
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
					console.log("LoadPicture: ", err);
					setLoading(false);
				});
		} else {
			setIsFormValid(true);
			setTextError("Picture are not valid");
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

			<div className="d-flex position-fixed bottom-0 mb-3 justify-content-center" style={{color: "black"}}>
				<Toast 
					show={isFormValid}
					onClose={() => setIsFormValid(!isFormValid)}
					delay={4000}
					bg="danger"
					autohide
					className="p-0"
				>
					<Toast.Header>
						<span className="me-auto">Form error</span>
					</Toast.Header>
					<Toast.Body>
						{ textError }
					</Toast.Body>
				</Toast>
			</div>
		</>
	);
};

export default Signup;
