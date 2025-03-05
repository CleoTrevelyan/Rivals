function checkUsername(socket, data, db) {
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
}
module.exports = { checkUsername };