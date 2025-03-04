const WebSocket = require('ws');
const { RivalsServer, RivalsServerPort } = require('../components/constants');
const db = require('./db'); // Import the database module

const server = new WebSocket.Server({ port: RivalsServerPort });
const clients = new Map();

server.on('connection', socket => {
  console.log('Client connected');

  // Handle incoming messages from clients
  socket.on('message', message => {
    try {
      const data = JSON.parse(message);

      switch (data.type) {
        case 'login':
          // Store the client with the playerID and gameID as the key
          clients.set(data.playerID, { socket, gameID: data.gameID });
          console.log(`Player ${data.playerID} logged in for game ${data.gameID}`);
          
          // Send a login confirmation back to the client
          socket.send(JSON.stringify({ message: `Player ${data.playerID} logged in for game ${data.gameID}` }));
          break;

        case 'gameOver':
          const winningPlayer = data.winningPlayer;
          const losingPlayer = data.losingPlayer;
          //put ELO calculation here`
          // Send the game result to all clients with the matching gameID
          sendGameResultToClients(data.gameID, data.winningPlayer + ' wins');
          break;
        case 'register':
          const generateUserID = () => {
            return Math.floor(100000 + Math.random() * 900000);
          }
  
          let userID = generateUserID();
  
          db.get(`SELECT userID FROM users WHERE userID = ?`, [userID], (err, row) => {
            if (err) {
              console.error(err.message);
              socket.send(JSON.stringify({ error: 'Database error' }));
              return;
            }
  
            // Regenerate userID if it already exists
            while (row) {
              userID = generateUserID();
              db.get(`SELECT userID FROM users WHERE userID = ?`, [userID], (err, row) => { // Reassign 'row' within the loop
                if (err) {
                  console.error(err.message);
                  socket.send(JSON.stringify({ error: 'Database error' }));
                  return;
                }
              });
            }
  
            db.run(`INSERT INTO users (userID, userName) VALUES (?, ?)`, [userID, data.userName], function(err) {
              if (err) {
                console.error(err.message);
                socket.send(JSON.stringify({ error: 'Failed to register user' }));
                return;
              }
              console.log(`A row has been inserted with rowid ${this.lastID}`);
              socket.send(JSON.stringify({ message: `User registered with userID ${userID}` }));
  
              // Insert into userStats
              db.run(`INSERT INTO userStats (userID) VALUES (?)`, [userID], function(err) {
                if (err) {
                  console.error(err.message);
                  // Consider whether to send an error back to the client or just log it
                  return;
                }
                console.log(`userStats entry created for userID ${userID}`);
              });
            });
          });
          break;
        case 'checkUsername':
          const username = data.username;
          //check username in database if it exists, return true if it does and false with error message containing either doesnt exist and the user needs to create an account or database error
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

// Function to send the game result to all clients with the matching gameID
function sendGameResultToClients(gameID, result) {
  console.log(`Sending game result for game ${gameID}: ${result}`);
  for (let [playerID, clientInfo] of clients.entries()) {
    if (clientInfo.gameID === gameID) {
      clientInfo.socket.send(JSON.stringify({ message: `Game result for game ${gameID}: ${result}` }));
    }
  }
}
