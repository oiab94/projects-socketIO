import { Badge, Button, CloseButton } from "react-bootstrap";

export const UserBadgeItem = ({ user, handleFunction }) => {
	return (
		<Badge
			className="mt-2 me-2"
			pill
			bg="secondary"
			as={Button}
			onClick={ handleFunction }
		>
			{user.name}
			<CloseButton variant="white" className="ms-2" />
		</Badge>
	);
};
