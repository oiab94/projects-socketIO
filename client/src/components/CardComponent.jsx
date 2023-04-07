import { Card } from "react-bootstrap";

const CardComponent = ({title, children}) => {
	return (
		<>
			<Card>
				<Card.Body>
					<Card.Title>
						<h3>{ title }</h3>
					</Card.Title>
					{
						children
					}
				</Card.Body>
			</Card>
		</>
	);
};

export { CardComponent };
