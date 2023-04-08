import "bootstrap/dist/css/bootstrap.min.css";
import "./static/css/App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import Chat from "./views/Chat";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Home />,
			children:[
				{
					path:"login",
					element:<Login /> ,
				},
				{
					path:"signup",
					element:<Signup />,
				}
			]
		},
		{
			path:"/chats",
			element: <Chat />,
		}
	]);

	return (
		<div className="App">
			<RouterProvider router={router} />;
		</div>
	);
}

export default App;
