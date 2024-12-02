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

let emailTemplates = []; // Stores email templates
let connectedUsers = {}; // Tracks connected users
let campaigns = []; // Store campaigns
let userInbox = {}; // Store emails for each user

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Add connected user
    connectedUsers[socket.id] = { id: socket.id, name: `User-${socket.id.slice(0, 5)}` };

    // Send the current email templates to the client
    socket.emit('update_email_templates', emailTemplates);

    // Send inbox to the user
    socket.on('request_inbox', () => {
        const inbox = userInbox[socket.id] || [];
        socket.emit('update_inbox', inbox);
    });

    // Handle creating a new email template
    socket.on('create_email_template', (template) => {
        emailTemplates.push(template);
        io.emit('update_email_templates', emailTemplates); // Broadcast updated templates to all clients
    });

    // Handle creating a new campaign
    socket.on('create_campaign', (campaign) => {
        // Prevent sending the same campaign twice
        const existingCampaign = campaigns.find(existingCampaign => existingCampaign.name === campaign.name && existingCampaign.status === 'scheduled');
        if (existingCampaign) return; // Prevent double sending of the same campaign

        campaigns.push(campaign);

        // Send the email to selected users or all users
        if (campaign.recipient === 'all') {
            Object.keys(connectedUsers).forEach((userId) => {
                if (!userInbox[userId]) userInbox[userId] = []; // Initialize inbox if it doesn't exist for the user
                userInbox[userId].push({
                    subject: campaign.name,
                    body: campaign.template.content,
                    timestamp: new Date().toISOString(),
                });
                io.to(userId).emit('update_inbox', userInbox[userId]);
            });
        } else {
            const recipientId = Object.keys(connectedUsers).find(userId => connectedUsers[userId].name === campaign.recipient);
            if (!userInbox[recipientId]) userInbox[recipientId] = []; // Initialize inbox for the recipient
            userInbox[recipientId].push({
                subject: campaign.name,
                body: campaign.template.content,
                timestamp: new Date().toISOString(),
            });
            io.to(recipientId).emit('update_inbox', userInbox[recipientId]);
        }

        // Notify all connected clients about the new campaign
        io.emit('update_campaigns', campaigns);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        delete connectedUsers[socket.id];
        io.emit('update_connected_users', Object.values(connectedUsers));
    });
});

// Start the server
server.listen(8080, () => {
    console.log('Server started on http://localhost:8080');
});
