import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import socket from "./socket";

function App() {
	const [isConnected, setIsConnected] = useState(false);

	const connectSocket = () => {
		console.log("Antes de conectar: ", socket);
		socket.connect();
		socket.on("connection", () => setIsConnected(true));
	};

	const disconnectSocket = () => {
		console.log("Despues de conectar: ", socket);
		socket.disconnect("disconnect", () => setIsConnected(false));
	};

	return (
		<>
			<h1>Hello World</h1>
			<button onClick={connectSocket}>Connect</button>
			<button onClick={disconnectSocket}>Disconnect</button>
			{isConnected ? <h2>Socket is ON</h2> : <h2>Socket is OFF</h2>}
		</>
	);
}

export default App;
