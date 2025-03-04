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
    userName TEXT NOT NULL UNIQUE
  )`);
});

module.exports = db;