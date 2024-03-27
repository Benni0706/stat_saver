const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const { open } = require('sqlite')

const router = express.Router()

router.get('/stats', async (req, res) => {
    const db = await open({
        filename: '/home/steam/server_1/garrysmod/data/stat_saver/ttt_stats.db',
        driver: sqlite3.Database
    })

    const players = await db.all("SELECT * FROM player")
    const rounds = await db.all("SELECT * FROM round ORDER BY date DESC")
    
    for (round in rounds) {
        const playerInRound = await db.all("SELECT * FROM playerInRound WHERE playerInRound.roundID = ?", [rounds[round]["roundID"]])
        rounds[round]["playerInRound"] = playerInRound
    }

    for (player in players) {
        const roundsPlayed = await db.get("SELECT COUNT(*) as roundsPlayed FROM playerInRound WHERE playername = ?", [players[player]["name"]])
        players[player]["roundsPlayed"] = roundsPlayed["roundsPlayed"]

        const wins = await db.get("SELECT COUNT(*) as wins FROM playerInRound WHERE playername = ? AND win = 1", [players[player]["name"]])
        players[player]["wins"] = wins["wins"]

        players[player]["loses"] = roundsPlayed["roundsPlayed"] - wins["wins"]

        players[player]["winrate"] = Math.round(wins["wins"] / roundsPlayed["roundsPlayed"] * 100)/100

        const kills = await db.get("SELECT COUNT(*) AS kills FROM kill WHERE attacker = ?", [players[player]["name"]])
        players[player]["kills"] = kills["kills"]

        const deaths = await db.get("SELECT COUNT(*) AS deaths FROM kill WHERE victim = ?", [players[player]["name"]])
        players[player]["deaths"] = deaths["deaths"]

        players[player]["kd"] = Math.round(kills["kills"] / deaths["deaths"] * 100)/100

        const playerEquipment = await db.all("SELECT * FROM equipment WHERE playername = ? ORDER BY amount DESC", [players[player]["name"]])
        players[player]["equipment"] = playerEquipment

        const playedRounds = await db.all("SELECT team, win, role FROM playerInRound WHERE playername = ? ORDER BY role", [players[player]["name"]])

        let winratePerTeam = []
        for (round in playedRounds) {
            let alreadyExists = false
            for (team in winratePerTeam) {
                if (winratePerTeam[team]["team"] == playedRounds[round]["team"]) {
                    alreadyExists = true
                    if (playedRounds[round]["win"] == 1) {
                        winratePerTeam[team]["wins"] += 1
                    } else {
                        winratePerTeam[team]["loses"] += 1
                    }
                }
            }
            if (!alreadyExists) {
                if (playedRounds[round]["win"] == 1) {
                    winratePerTeam.push({"team": playedRounds[round]["team"], "wins": 1, "loses": 0})
                } else {
                    winratePerTeam.push({"team": playedRounds[round]["team"], "wins": 0, "loses": 1})
                }
            }
        }

        winratePerTeam.sort((a, b) => {
            return (b.wins / (b.wins + b.loses)) - (a.wins / (a.wins + a.loses))
        })
        players[player]["winratePerTeam"] = winratePerTeam

        let winratePerRole = []
        for (round in playedRounds) {
            let alreadyExists = false
            for (role in winratePerRole) {
                if (winratePerRole[role]["role"] == playedRounds[round]["role"]) {
                    alreadyExists = true
                    if (playedRounds[round]["win"] == 1) {
                        winratePerRole[role]["wins"] += 1
                    } else {
                        winratePerRole[role]["loses"] += 1
                    }
                }
            }
            if (!alreadyExists) {
                if (playedRounds[round]["win"] == 1) {
                    winratePerRole.push({"role": playedRounds[round]["role"], "wins": 1, "loses": 0})
                } else {
                    winratePerRole.push({"role": playedRounds[round]["role"], "wins": 0, "loses": 1})
                }
            }
        }

        winratePerRole.sort((a, b) => {
            return (b.wins / (b.wins + b.loses)) - (a.wins / (a.wins + a.loses))
        })
        players[player]["winratePerRole"] = winratePerRole
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

    const playerInRoundTotal = await db.all("SELECT * FROM playerInRound")
    
    const playedRounds = await db.all("SELECT team, win, role FROM playerInRound ORDER BY role")

    let winratePerTeam = []
    for (round in playedRounds) {
        let alreadyExists = false
        for (team in winratePerTeam) {
            if (winratePerTeam[team]["team"] == playedRounds[round]["team"]) {
                alreadyExists = true
                if (playedRounds[round]["win"] == 1) {
                    winratePerTeam[team]["wins"] += 1
                } else {
                    winratePerTeam[team]["loses"] += 1
                }
            }
        }
        if (!alreadyExists) {
            if (playedRounds[round]["win"] == 1) {
                winratePerTeam.push({"team": playedRounds[round]["team"], "wins": 1, "loses": 0})
            } else {
                winratePerTeam.push({"team": playedRounds[round]["team"], "wins": 0, "loses": 1})
            }
        }
    }

    winratePerTeam.sort((a, b) => {
        return (b.wins / (b.wins + b.loses)) - (a.wins / (a.wins + a.loses))
    })

    let winratePerRole = []
    for (round in playedRounds) {
        let alreadyExists = false
        for (role in winratePerRole) {
            if (winratePerRole[role]["role"] == playedRounds[round]["role"]) {
                alreadyExists = true
                if (playedRounds[round]["win"] == 1) {
                    winratePerRole[role]["wins"] += 1
                } else {
                    winratePerRole[role]["loses"] += 1
                }
            }
        }
        if (!alreadyExists) {
            if (playedRounds[round]["win"] == 1) {
                winratePerRole.push({"role": playedRounds[round]["role"], "wins": 1, "loses": 0})
            } else {
                winratePerRole.push({"role": playedRounds[round]["role"], "wins": 0, "loses": 1})
            }
        }
    }

    winratePerRole.sort((a, b) => {
        return (b.wins / (b.wins + b.loses)) - (a.wins / (a.wins + a.loses))
    })

    res.send(
        {
            player: players,
            round: rounds,
            equipAmount: equipAmount,
            playerInRoundTotal: playerInRoundTotal,
            winratePerRole: winratePerRole,
            winratePerTeam: winratePerTeam,
        }
    )
    db.close()
})

module.exports = router
