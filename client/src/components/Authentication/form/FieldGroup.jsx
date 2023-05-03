import { Form } from "react-bootstrap";

const FieldGroup = ({id, label, type, placeholder, handleChange, value}) => {
	return (
		<Form.Group className="mb-3" controlId={ id }>
			<Form.Label>{ label }</Form.Label>
			<Form.Control value={ value } type={ type } placeholder={ placeholder } onChange={ handleChange } />
		</Form.Group>
	);
};

export default FieldGroup;
