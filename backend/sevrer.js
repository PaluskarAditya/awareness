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
let campaigns = []; // Stores campaigns
let userInbox = {}; // Stores emails for each user

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Add connected user
    connectedUsers[socket.id] = { id: socket.id, name: `User-${socket.id.slice(0, 5)}` };

    // Send current email templates and campaigns to the client
    socket.emit('update_email_templates', emailTemplates);
    socket.emit('update_campaigns', campaigns);

    // Handle inbox requests
    socket.on('request_inbox', () => {
        const inbox = userInbox[socket.id] || [];
        socket.emit('update_inbox', inbox);
    });

    // Handle creating a new email template
    socket.on('create_email_template', (template) => {
        if (!template.name || !template.content) {
            console.error('Invalid template data:', template);
            return;
        }

        console.log('Received new template:', template);
        emailTemplates.push(template);
        io.emit('update_email_templates', emailTemplates); // Broadcast updated templates
    });

    // Handle creating a new campaign
    socket.on('create_campaign', (campaign) => {
        if (!campaign.name || !campaign.template) {
            console.error('Invalid campaign data:', campaign);
            return;
        }

        // Avoid duplicate campaigns
        const existingCampaign = campaigns.find((c) => c.name === campaign.name && c.status === 'scheduled');
        if (existingCampaign) {
            console.log('Campaign already exists:', campaign.name);
            return;
        }

        const emailTemplate = campaign.template;

        if (!emailTemplates.find((t) => t.name === emailTemplate.name)) {
            console.error('Template not found for campaign:', emailTemplate);
            return;
        }

        console.log('Creating new campaign:', campaign);
        campaigns.push(campaign);

        const email = {
            name: 'System',
            from: 'no-reply@system.com',
            to: campaign.recipient === 'all' ? 'All Users' : campaign.recipient,
            subject: campaign.name,
            body: emailTemplate.content,
            timestamp: new Date().toISOString(),
        };

        // Send email to all or specific users
        if (campaign.recipient === 'all') {
            Object.keys(connectedUsers).forEach((userId) => {
                if (!userInbox[userId]) userInbox[userId] = [];
                userInbox[userId].push(email);
                io.to(userId).emit('update_inbox', userInbox[userId]);
            });
        } else {
            const recipientId = Object.keys(connectedUsers).find(
                (userId) => connectedUsers[userId].name === campaign.recipient
            );
            if (recipientId) {
                if (!userInbox[recipientId]) userInbox[recipientId] = [];
                userInbox[recipientId].push(email);
                io.to(recipientId).emit('update_inbox', userInbox[recipientId]);
            }
        }

        // Broadcast updated campaigns
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
