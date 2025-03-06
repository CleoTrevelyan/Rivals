const saltRounds = 10; // Recommended salt rounds for bcrypt
const bcrypt = require('bcryptjs');

function handleRegister(socket, data, db) {
    const generateUserID = () => {
        return Math.floor(100000 + Math.random() * 900000);
    }

    let userID = generateUserID();

    // Check if the email is already registered
    db.get(`SELECT userID FROM users WHERE email = ?`, [data.email], (err, row) => {
        if (err) {
            console.error(err.message);
            socket.send(JSON.stringify({ error: 'Database error' }));
            return;
        }

        if (row) {
            // Email is already registered
            socket.send(JSON.stringify({ error: 'Email is already registered' }));
            return;
        }

        // Proceed with user registration
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
    });
}

module.exports = { handleRegister };