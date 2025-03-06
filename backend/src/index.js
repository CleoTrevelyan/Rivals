const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid'); // Import uuid for generating unique tokens
const { RivalsServer, RivalsServerPort, NnCServer } = require('../components/constants');
const { handleLogin } = require('../components/handleLogin'); // Correctly import handleLogin
const { handleGameOver } = require('../components/handleGameOver'); // Correctly import handleGameOver
const { handleRegister } = require('../components/handleRegister'); // Correctly import handleRegister
const { checkUsername } = require('../components/checkRivalsData'); // Correctly import checkUsername
const { handleMatchmaking } = require('../components/handleMatchmaking'); // Correctly import handleMatchmaking
const { handleAuthToken } = require('../components/handleAuthToken'); // Correctly import handleAuthToken
const db = require('./db'); // Import the database module

const ELO_CHANGE = 20;

const server = new WebSocket.Server({ port: RivalsServerPort });
const clients = new Map();
const matchmakingUsers = new Map();

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
    clients.set(clientID, { socket: socket, matchmaking: {isMatchmaking: false, game: null} });
    
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
                case 'matchmake':
                    handleMatchmaking(data, clients, matchmakingUsers);
                    break;
                case 'authTokenVerification':
                    handleAuthToken(socket, data, clients, clientID);
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