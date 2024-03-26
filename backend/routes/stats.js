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

    for (player in players) {
        const kills = await db.get("SELECT COUNT(*) AS kills FROM kill WHERE attacker = ?", [players[player]["name"]])
        players[player]["kills"] = kills["kills"]

        const deaths = await db.get("SELECT COUNT(*) AS deaths FROM kill WHERE victim = ?", [players[player]["name"]])
        players[player]["deaths"] = deaths["deaths"]

        players[player]["kd"] = Math.round(kills["kills"] / deaths["deaths"] * 100)/100

        const playerEquipment = await db.all("SELECT * FROM equipment WHERE playername = ? ORDER BY amount DESC", [players[player]["name"]])
        players[player]["equipment"] = playerEquipment
    }

    const equipment = await db.all("SELECT label, amount FROM equipment")

    let equipAmount = []
    for (equip in equipment) {
        let alreadyExists = false
        for (equipA in equipAmount) {
            if (equipAmount[equipA]["label"] == equipment[equip]["label"]) {
                alreadyExists = true
                equipAmount[equipA]["amount"] += equipment[equip]["amount"]
            }
        }
        if (!alreadyExists) {
            equipAmount.push({"label": equipment[equip]["label"], "amount": equipment[equip]["amount"]})
        }
    }
    equipAmount.sort((a, b) => {
        return b.amount - a.amount
    })
    
    res.send(
        {
            player: players,
            round: rounds,
            equipAmount: equipAmount,
        }
    )
    db.close()
})

module.exports = router
