const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./users.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the users database.');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        userID INTEGER PRIMARY KEY AUTOINCREMENT,
        userName TEXT NOT NULL UNIQUE,
        email TEXT,
        password TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS userStats (
        userID INTEGER PRIMARY KEY,
        elo INTEGER DEFAULT 1000,
        wins INTEGER DEFAULT 0,
        FOREIGN KEY (userID) REFERENCES users(userID)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS leaderboard (
        userID INTEGER,
        userName TEXT,
        elo INTEGER,
        PRIMARY KEY (userID),
        FOREIGN KEY (userID) REFERENCES users(userID)
    )`);
});

// Add columns using ALTER TABLE (runs only once)
// db.run(`ALTER TABLE users ADD COLUMN email TEXT`);
// db.run(`ALTER TABLE users ADD COLUMN password TEXT`);
// db.run(`CREATE UNIQUE INDEX IF NOT EXISTS idx_email_unique ON users (email) WHERE email IS NOT NULL;`);

module.exports = db;