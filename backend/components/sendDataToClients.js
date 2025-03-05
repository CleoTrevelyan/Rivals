
function sendGameResultToClients(gameID, result, clients, isDraw) {
    console.log(`Sending game result for game ${gameID}: ${result}`);
    for (let [clientInfo] of clients.entries()) {
        if (clientInfo.gameID === gameID) {
            clientInfo.socket.send(JSON.stringify({ message: `Game result for game ${gameID}: ${result}` }));
        }
    }
}

module.exports = { sendGameResultToClients };