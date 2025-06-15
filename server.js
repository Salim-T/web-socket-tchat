const webSocket = require('ws');

const server = new webSocket.Server({ port: 8080 });

console.log('WebSocket server is running on ws://localhost:8080');

const clients = new Set();

server.on('connection', (socket) => {
    // Handle new client connection
    console.log('New client connected');
    // Send a welcome message to the client
    socket.send('Welcome to the WebSocket server!');

    clients.add(socket);

    clients.forEach((client) => {
        if (client !== socket && client.readyState === webSocket.OPEN) {
        client.send('A new client has joined the server.');
    });

    // Handle incoming messages from the client
    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // Echo the message back to the client
        clients.forEach((client) => {
            if (client.readyState === webSocket.OPEN) {
                client.send(`${message}`);
            }
        });
        // socket.send(`You said: ${message}`);
    });

    // Handle client disconnection
    socket.on('close', () => {
        console.log('Client disconnected');
    });
});