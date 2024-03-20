const express = require('express')
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database("/home/benni/Schreibtisch/ttt_stats.db", (err) => {
    if (err) {
      console.error(err.message)
    }
    console.log('Connected to the chinook database.')
})

const router = express.Router()

router.get('/round', (req, res) => {
    db.all('SELECT * FROM round', (err, rows) => {
        if (err) {
            console.error(err.message)
        }
        res.send(rows)
    })
})

router.get('/player', (req, res) => {
    db.all('SELECT * FROM player', (err, rows) => {
        if (err) {
            console.error(err.message)
        }
        res.send(rows)
    })
})

router.get('/playerInRound', (req, res) => {
    db.all('SELECT * FROM playerInRound', (err, rows) => {
        if (err) {
            console.error(err.message)
        }
        res.send(rows)
    })
})

module.exports = router
