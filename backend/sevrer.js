const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

app.use(express.json());
app.use(cors());

let clientInbox = []; // Stores emails
let emailTemplates = []; // Stores email templates
let connectedUsers = {}; // Tracks connected users

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Add connected user
    connectedUsers[socket.id] = { id: socket.id, name: `User-${socket.id.slice(0, 5)}` };

    // Notify clients about connected users
    io.emit('update_connected_users', Object.values(connectedUsers));

    // Send the current inbox to the client
    socket.emit('load_inbox', clientInbox);
    socket.emit('update_email_templates', emailTemplates);

    // Handle sending a new email
    socket.on('send_email', (email) => {
        email.timestamp = Date.now();
        email.response = null; // Initially no response
        clientInbox.push(email);
        io.emit('load_inbox', clientInbox); // Broadcast updated inbox
    });

    // Handle email response
    socket.on('email_response', ({ index, response, reason }) => {
        if (clientInbox[index]) {
            const email = clientInbox[index];
            email.response = { status: response, reason, timestamp: Date.now() };
            console.log(`Email #${index} marked as ${response}: ${reason}`);

            // Broadcast updated inbox to all clients
            io.emit('load_inbox', clientInbox);
        } else {
            console.error(`Email with index ${index} not found.`);
        }
    });

    // Handle creating a new email template
    socket.on('create_email_template', (template) => {
        emailTemplates.push(template);
        io.emit('update_email_templates', emailTemplates); // Broadcast updated templates to all clients
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        delete connectedUsers[socket.id];
        io.emit('update_connected_users', Object.values(connectedUsers));
    });
});

// Serve static files
app.use(express.static('public'));

server.listen(8080, () => {
    console.log('Server running at http://localhost:8080');
});
