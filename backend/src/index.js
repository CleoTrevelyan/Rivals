const WebSocket = require('ws');
const { RivalsServer, RivalsServerPort } = require('../components/constants');
const db = require('./db'); // Import the database module

const ELO_CHANGE = 20;

const server = new WebSocket.Server({ port: RivalsServerPort });
const clients = new Map();

server.on('connection', socket => {
  console.log('Client connected');

  // Handle incoming messages from clients
  socket.on('message', message => {
    try {
      const data = JSON.parse(message);

      switch (data.type) {
        // case 'login': 
        //   break;

        case 'gameOver':
          let { winningPlayer, losingPlayer, gameID, isDraw } = data;
          console.log(`Game over: ${winningPlayer} won against ${losingPlayer} in game ${gameID}`);
    
          db.get(`SELECT elo FROM userStats WHERE userID = ?`, [winningPlayer], (err, winner) => {
            if (err) {
              console.error(err.message);
              return;
            }
            db.get(`SELECT elo FROM userStats WHERE userID = ?`, [losingPlayer], (err, loser) => {
              if (err) {
                console.error(err.message);
                return;
              }

              if (winner && loser) {
                sendGameResultToClients(gameID, { winningPlayer, losingPlayer, winningPlayerElo: winner.elo, losingPlayerElo: loser.elo });
              } else {
                console.error("Couldn't find one or both players");
              }

              // Update Elo values
              const newWinnerElo = winner.elo + ELO_CHANGE;
              const newLoserElo = loser.elo - ELO_CHANGE;

              db.run(`UPDATE userStats SET elo = ? WHERE userID = ?`, [newWinnerElo, winningPlayer], (err) => {
                if (err) {
                  console.error(err.message);
                } else {
                  console.log(`Updated Elo for ${winningPlayer} to ${newWinnerElo}`);
                }
              });

              db.run(`UPDATE userStats SET elo = ? WHERE userID = ?`, [newLoserElo, losingPlayer], (err) => {
                if (err) {
                  console.error(err.message);
                } else {
                  console.log(`Updated Elo for ${losingPlayer} to ${newLoserElo}`);
                }
                updateLeaderboard(db);
              });
            });
          });
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
  
            db.run(`INSERT INTO users (userID, userName) VALUES (?, ?)`, [userID, data.username], function(err) {
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
            db.get(`SELECT userID FROM users WHERE userName = ?`, [username], (err, row) => {
            if (err) {
              console.error(err.message);
              socket.send(JSON.stringify({ error: 'Database error' }));
              return;
            }

            if (row) {
              socket.send(JSON.stringify({ type: 'usernameChecked', userID: row.userID }));
              console.log(`Username ${username} exists with userID ${row.userID} and has been sent`);
            } else {
              socket.send(JSON.stringify({ error: 'Username does not exist. Please create an account.' }));
              socket.send(JSON.stringify({ type: 'usernameDoesNotExist', userID: row.userID }));
            }
            });
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

function updateLeaderboard(db) {
    db.all(`
        SELECT us.userID, u.userName, us.elo
        FROM userStats us
        JOIN users u ON us.userID = u.userID
        ORDER BY us.elo DESC
        LIMIT 10
    `, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return;
        }

        db.serialize(() => {
          db.run(`DELETE FROM leaderboard`); // Clear existing leaderboard
          const stmt = db.prepare(`INSERT INTO leaderboard (userID, userName, elo) VALUES (?, ?, ?)`);
          rows.forEach(row => {
            stmt.run(row.userID, row.userName, row.elo);
          });
          stmt.finalize();
        });
    });
}

// Function to send the game result to all clients with the matching gameID
function sendGameResultToClients(gameID, result) {
  console.log(`Sending game result for game ${gameID}: ${result}`);
  for (let [playerID, clientInfo] of clients.entries()) {
    if (clientInfo.gameID === gameID) {
      clientInfo.socket.send(JSON.stringify({ message: `Game result for game ${gameID}: ${result}` }));
    }
  }
}
