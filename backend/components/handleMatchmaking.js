function handleMatchmaking (data, clients, matchmakingUsers) {
    // Find a match for the player
    let playerID = data.playerID;
    let playerElo = data.playerElo;
    let playerSocket = clients.get(playerID).socket;
    playerSocket.game = data.game;
    playerSocket.isMatchmaking = true;
    matchmakingUsers.set(playerID, { socket: playerSocket, game: data.game });
    let opponentID = null;
    let opponentElo = null;
    for (let [opponent, clientInfo] of matchmakingUsers.entries()) {
        if (opponent !== playerID && clientInfo.isMatchmaking == true && clientInfo.game === data.game) {
            opponentID = opponent;
            opponentElo = clientInfo.elo;
            break;
        }
    }
    if (opponentID) {
        // Generate a unique token for the match
        const matchToken = uuidv4();
        const playerToken = uuidv4();
        const opponentToken = uuidv4();
        const playerORopponent = Math.random() < 0.5 ? 'player' : 'opponent';
        // Assign X and O to the players
        if(playerORopponent === 'player') {                        
            const NnCSocket = new WebSocket(NnCServer);
            NnCSocket.on('open', () => {
                NnCSocket.send(JSON.stringify({
                    type: 'matchData',
                    playerXID: playerID,
                    playerXToken: playerToken,
                    playerOID: opponentID,
                    playerOToken: opponentToken,
                    matchToken: matchToken,
                }));
            });
            NnCSocket.on('message', (message) => {
                console.log('Match data sent to NnCServer:', message);
            });
            NnCSocket.on('error', (error) => {
                console.error('Error sending match data to NnCServer:', error);
            });
        }else if(playerORopponent === 'opponent') {
            const NnCSocket = new WebSocket(NnCServer);
            NnCSocket.on('open', () => {
                NnCSocket.send(JSON.stringify({
                    type: 'matchData',
                    playerXID: opponentID,
                    playerXToken: opponentToken,
                    playerOID: playerID,
                    playerOToken: playerToken,
                    matchToken: matchToken,
                }));
            });
            NnCSocket.on('message', (message) => {
                console.log('Match data sent to NnCServer:', message);
            });
            NnCSocket.on('error', (error) => {
                console.error('Error sending match data to NnCServer:', error);
            });
        }
        // Send the match data to both players
        playerSocket.send(JSON.stringify({
            type: 'matchFound',
            playerID: playerID,
            playerElo: playerElo,
            playerToken: playerToken,
            opponentID: opponentID,
            opponentElo: opponentElo,
        }));
        clients.get(opponentID).socket.send(JSON.stringify({
            type: 'matchFound',
            playerID: opponentID,
            playerElo: opponentElo,
            playerToken: opponentToken,
            opponentID: playerID,
            opponentElo: playerElo,
        }));
        clients.get(playerID).isMatchmaking = false;
        clients.get(opponentID).isMatchmaking = false;
        clients.get(playerID).game = null;
        clients.get(opponentID).game = null;
        // Store the match token locally
        clients.get(playerID).matchToken = matchToken;
        clients.get(opponentID).matchToken = matchToken;
        // Remove the players from the matchmaking map
        matchmakingUsers.delete(playerID);
        matchmakingUsers.delete(opponentID);
    } else {
        // No opponent found
        playerSocket.send(JSON.stringify({ type: 'matchNotFound' }));
    }
}

module.exports = { handleMatchmaking };