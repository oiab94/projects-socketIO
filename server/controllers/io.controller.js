const connection = (io) => {
	io.on(
		"connection",
		(socket) => {
			console.log(`SOCKET: Conexion establecida con ${socket.id}`);
			socket.on(
				"client:newnote",
				(data) => console.log(data)
			);
		}
	);
};


export {
	connection,
};