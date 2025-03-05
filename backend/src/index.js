const WebSocket = require('ws');
const { RivalsServer, RivalsServerPort } = require('../components/constants');
const { handleLogin } = require('../components/handleLogin'); // Correctly import handleLogin
const { handleGameOver } = require('../components/handleGameOver'); // Correctly import handleGameOver
const { handleRegister } = require('../components/handleRegister'); // Correctly import handleRegister
const { checkUsername } = require('../components/checkRivalsData'); // Correctly import checkUsername
const db = require('./db'); // Import the database module
const bcrypt = require('bcrypt'); // Import bcrypt

const ELO_CHANGE = 20;

const server = new WebSocket.Server({ port: RivalsServerPort });
const clients = new Map();

// So that ClientIDs don't collide with UserIDs
const generateClientID = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
};

server.on('connection', socket => {
    // Assign a random client ID
    let clientID = generateClientID();
    clients.set(clientID, { socket });
    
    console.log('Client connected');
    console.log(`Client ID: ${clientID} with data: ${clients.get(clientID)}`);

    // Handle incoming messages from clients
    socket.on('message', message => {
        try {
            const data = JSON.parse(message);

            switch (data.type) {
                case 'login':
                    handleLogin(socket, data, clients, clientID, db);
                    break;
                case 'gameOver':
                    handleGameOver(data, db, clients);
                    break;
                case 'register':
                    handleRegister(socket, data, db);
                    break;
                case 'checkUsername':
                    checkUsername(socket, data, db);
                    break;
                default:
                    console.error('Unknown message type:', data.type);
                    socket.send(JSON.stringify({ error: 'Unknown message type' }));
                    break;
            }
        } catch (error) {
            console.error('Error parsing message:', error);
            socket.send(JSON.stringify({ error: 'Invalid message format' }));
        }
    });

    // Handle client disconnection
    socket.on('close', () => {
        console.log('Client disconnected');
        // Remove the client from the map
        for (let [playerID, clientInfo] of clients.entries()) {
            if (clientInfo.socket === socket) {
                clients.delete(playerID);
                break;
            }
        }
    });
});

console.log(`WebSocket server is running on ${RivalsServer}`);