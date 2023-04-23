import { Stack } from "react-bootstrap";

const ChatLoading = () => {

	return (
		<Stack gap={2} className="pt-2">
			<div className="border border-2 d-flex w-100 p-0 search-stack"></div>
			<div className="border border-2 d-flex w-100 p-0 search-stack"></div>
			<div className="border border-2 d-flex w-100 p-0 search-stack"></div>
		</Stack>
	);
};

export {
	ChatLoading,
};