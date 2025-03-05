function handleAuthToken(socket, data, clients, clientID) {
    const { authToken } = data;

    // Find the client with the matching authToken
    for (let [userID, userIDInfo] of clients.entries()) {
        if (userIDInfo.authToken === authToken) {
            clients.get(userID, { socket: socket });
            clients.delete(clientID);
            socket.send(JSON.stringify({ type: 'authTokenVerified', message: 'Auth token is valid' }));
            console.log('Auth success');
            return;
        }
    }
    console.log("Auth unsuccessful");
    socket.send(JSON.stringify({ type: 'authTokenInvalid', message: 'Auth token is invalid' }));
}

module.exports = { handleAuthToken };