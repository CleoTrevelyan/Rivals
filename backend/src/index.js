const WebSocket = require('ws');
const { RivalsServer, RivalsServerPort } = require('../components/constants');

const server = new WebSocket.Server({ port: RivalsServerPort });
const clients = new Map();

server.on('connection', socket => {
  console.log('Client connected');

  // Handle incoming messages from clients
  socket.on('message', message => {
    try {
      const data = JSON.parse(message);

      if (data.type === 'login') {
        // Store the client with the playerID and gameID as the key
        clients.set(data.playerID, { socket, gameID: data.gameID });
        console.log(`Player ${data.playerID} logged in for game ${data.gameID}`);
        
        // Send a login confirmation back to the client
        socket.send(JSON.stringify({ message: `Player ${data.playerID} logged in for game ${data.gameID}` }));
      } else if (data.type === 'gameOver') {
        const winningPlayer = data.winningPlayer;
        const losingPlayer = data.losingPlayer;
        //put MMR calculation here`
        // Send the game result to all clients with the matching gameID
        sendGameResultToClients(data.gameID, data.winningPlayer + ' wins');

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
