import "bootstrap/dist/css/bootstrap.min.css";
import "./static/css/App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import Chat from "./views/Chat";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import { ChatProvider } from "./context/ChatProvider";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: 
				<ChatProvider>
					<Home />,
				</ChatProvider>,
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
			element: 
				<ChatProvider>
					<Chat />,
				</ChatProvider>,
		}
	]);

	return (
		<div className="App">
			<RouterProvider router={router} />;
		</div>
	);
}

export default App;
