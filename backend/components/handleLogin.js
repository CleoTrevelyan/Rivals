const bcrypt = require('bcrypt');

function handleLogin(socket, data, clients, clientID, db) {
    // Determine if the input is a username or an email
    const isEmail = data.username.includes('@');
    const query = isEmail ? `SELECT userID, password FROM users WHERE email = ?` : `SELECT userID, password FROM users WHERE userName = ?`;
    const identifier = data.username;

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
                    socket.send(JSON.stringify({ type: 'loginSuccess', userID: row.userID, message: 'Successfully logged in!' }));
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
}

module.exports = { handleLogin };