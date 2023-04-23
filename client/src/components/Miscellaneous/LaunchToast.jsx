import { Toast } from "react-bootstrap";

const LaunchToast = ({ title, body, onClose, show, bg, delay }) => {

	return (
		<Toast
			onClose={ onClose}
			show={ show }
			bg={ bg }
			delay={ delay }
			className="p-0"
		>
			{
				title
					? <Toast.Header>
						<strong className="me-auto">{ title }</strong>
					</Toast.Header>
					: null
			}
			<Toast.Body style={{ color: "black" }}>
				<strong>{ body }</strong>
			</Toast.Body>
		</Toast>
	);
};

export default LaunchToast;