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

module.exports = { updateLeaderboard };