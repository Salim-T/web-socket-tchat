const webSocket = require('ws');

const server = new webSocket.Server({ port: 8080 });

console.log('WebSocket server is running on ws://localhost:8080');

server.on('connection', (socket) => {
    // Handle new client connection
    console.log('New client connected');
    // Send a welcome message to the client
    socket.send('Welcome to the WebSocket server!');

    server.clients.forEach((client) => {
        client.send('A new client has joined the server.');
    });

    // Handle incoming messages from the client
    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // Echo the message back to the client
        server.clients.forEach((client) => {
            client.send(`Client says: ${message}`);
        });
        // socket.send(`You said: ${message}`);
    });

    // Handle client disconnection
    socket.on('close', () => {
        console.log('Client disconnected');
    });
});