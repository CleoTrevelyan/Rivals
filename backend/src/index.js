const WebSocket = require('ws');
const { RivalsServer, RivalsServerPort } = require('../components/constants');
const db = require('./db'); // Import the database module
const bcrypt = require('bcrypt'); // Import bcrypt
const saltRounds = 10; // Recommended salt rounds for bcrypt

const ELO_CHANGE = 20;

const server = new WebSocket.Server({ port: RivalsServerPort });
const clients = new Map();

const generateClientID = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
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
                    // Determine if the input is a username or an email
                    const isEmail = data.email ? true : false;
                    const query = isEmail ? `SELECT userID, password FROM users WHERE email = ?` : `SELECT userID, password FROM users WHERE userName = ?`;
                    const identifier = isEmail ? data.email : data.username;

                    db.get(query, [identifier], (err, row) => {
                        if (err) {
                            console.error(err.message);
                            socket.send(JSON.stringify({ error: 'Database error' }));
                            return;
                        }

                        if (row) {
                            bcrypt.compare(data.password, row.password, (err, result) => {
                                if (err) {
                                    console.error(err.message);
                                    socket.send(JSON.stringify({ error: 'Authentication error' }));
                                    return;
                                }

                                if (result) {
                                    // Passwords match
                                    socket.send(JSON.stringify({ type: 'loginSuccess', userID: row.userID }));
                                    console.log(`User ${data.username} logged in successfully.`);

                                    // Update the clients map to use userID instead of clientID
                                    clients.set(row.userID, clients.get(clientID));
                                    clients.delete(clientID);
                                    clientID = row.userID; // Update clientID to userID
                                } else {
                                    // Passwords don't match
                                    socket.send(JSON.stringify({ type: 'loginFailed', message: 'Invalid credentials' }));
                                    console.log(`Login failed for user ${data.username}.`);
                                }
                            });
                        } else {
                            // User not found
                            socket.send(JSON.stringify({ type: 'loginFailed', message: 'Invalid credentials' }));
                            console.log(`Login failed for user ${data.username}. User not found.`);
                        }
                    });
                    break;
                case 'gameOver':
                    let { winningPlayer, losingPlayer, gameID, isDraw } = data;
                    if (isDraw) {
                        console.log(`Game over: Draw between ${winningPlayer} and ${losingPlayer} in game ${gameID}`);
                    } else {
                        console.log(`Game over: ${winningPlayer} won against ${losingPlayer} in game ${gameID}`);
                    }
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

                            let newWinnerElo, newLoserElo;
                            // Update Elo values
                            if (!isDraw) {
                                newWinnerElo = winner.elo + ELO_CHANGE;
                                newLoserElo = loser.elo - ELO_CHANGE;
                                console.log(`New Elo for ${winningPlayer}: ${newWinnerElo}`);
                                console.log(`New Elo for ${losingPlayer}: ${newLoserElo}`);
                            } else {
                                newWinnerElo = winner.elo;
                                newLoserElo = loser.elo;
                                console.log(`New Elo for ${winningPlayer}: ${newWinnerElo}`);
                                console.log(`New Elo for ${losingPlayer}: ${newLoserElo}`);
                            }

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
                    // Use directly from data: const { username, email, password } = data;
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

                        // Hash the password
                        bcrypt.hash(data.password, saltRounds, (err, hash) => {
                            if (err) {
                                console.error(err.message);
                                socket.send(JSON.stringify({ error: 'Failed to register user' }));
                                return;
                            }

                            db.run(`INSERT INTO users (userID, userName, email, password) VALUES (?, ?, ?, ?)`, [userID, data.username, data.email, hash], function (err) {
                                if (err) {
                                    console.error(err.message);
                                    socket.send(JSON.stringify({ error: 'Failed to register user' }));
                                    return;
                                }
                                console.log(`A row has been inserted with rowid ${this.lastID}`);
                                socket.send(JSON.stringify({ message: `User registered with userID ${userID}` }));

                                // Insert into userStats
                                db.run(`INSERT INTO userStats (userID) VALUES (?)`, [userID], function (err) {
                                    if (err) {
                                        console.error(err.message);
                                        // Consider whether to send an error back to the client or just log it
                                        return;
                                    }
                                    console.log(`userStats entry created for userID ${userID}`);
                                });
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
                            socket.send(JSON.stringify({ type: 'usernameDoesNotExist' }));
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
        console.log(rows);
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
