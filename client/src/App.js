import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import Chat from "./views/Chat";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Home />,
		},
		{
			path:"/chats",
			element: <Chat />,
		}
	]);

	return <RouterProvider router={router} />;
}

export default App;
