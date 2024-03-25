const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const { open } = require('sqlite')

const router = express.Router()

router.get('/stats', async (req, res) => {
    const db = await open({
        filename: '/home/benni/Schreibtisch/ttt_stats.db',
        driver: sqlite3.Database
    })

    const players = await db.all("SELECT * FROM player")
    const rounds = await db.all("SELECT * FROM round")
    
    for (round in rounds) {
        const playerInRound = await db.all("SELECT * FROM playerInRound WHERE playerInRound.roundID = ?", [rounds[round]["roundID"]])
        rounds[round]["playerInRound"] = playerInRound
    }
    
    res.send(
        {
            player: players,
            round: rounds,
        }
    )
    db.close()
})

module.exports = router
