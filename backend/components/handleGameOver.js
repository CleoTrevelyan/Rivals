const { ELO_CHANGE } = require('../../MVP/components/constants'); // Correct import path
const { sendGameResultToClients } = require('./sendDataToClients');
const { updateLeaderboard } = require('./leaderBoardHandler');

function handleGameOver(data, db, clients) {
    let { winningPlayer, losingPlayer, gameID, isDraw } = data;
    if (isDraw == true) {
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

            console.log(`Winner Elo: ${winner.elo}, Loser Elo: ${loser.elo}, ELO_CHANGE: ${ELO_CHANGE}`);

            let newWinnerElo, newLoserElo;
            // Update Elo values
            if (isDraw == false) {
                newWinnerElo = winner.elo + ELO_CHANGE;
                newLoserElo = loser.elo - ELO_CHANGE;
                console.log(`New Elo for winner, ${winningPlayer}: ${newWinnerElo}`);
                console.log(`New Elo for loser, ${losingPlayer}: ${newLoserElo}`);
            } else {
                newWinnerElo = winner.elo;
                newLoserElo = loser.elo;
                console.log(`New Elo for ${winningPlayer}: ${newWinnerElo}`);
                console.log(`New Elo for ${losingPlayer}: ${newLoserElo}`);
            }

            if (winner && loser) {
                sendGameResultToClients(gameID, {
                    winningPlayer,
                    oldWinningPlayerElo: winner.elo,
                    newWinningPlayerElo: newWinnerElo,
                    losingPlayer,
                    oldLosingPlayerElo: loser.elo,
                    newLosingPlayerElo: newLoserElo
                }, clients);
            } else {
                console.error("Couldn't find one or both players");
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
}

module.exports = { handleGameOver };