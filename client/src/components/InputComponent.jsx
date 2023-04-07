import { Form } from "react-bootstrap";

const InputComponent = ({ as, id, name, type, placeholder, onChange, value,rows }) => {
	return (
		<>
			<Form.Control
				id={ id }
				name={ name }
				type={ type }
				placeholder={ placeholder }
				onChange={ onChange }
				value={ value }
				as={ as }
				rows={ rows }
				autoFocus
				className="mb-3" />					
		</>
	);
};

export { InputComponent };
