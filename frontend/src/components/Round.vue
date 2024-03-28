<script setup>
const props = defineProps(['round'])

function teamColor(team) {
    let color = "bg-gray-500"
    if (team == "innocents") {
        color = "bg-green-600"
    } else if (team == "traitors") {
        color = "bg-red-600"
    } else if (team == "nones") {
        color = "bg-gray-500"
    } else if (team == "clowns" || team == "jesters") {
        color = "bg-purple-500"
    } else if (team == "serialkillers") {
        color = "bg-cyan-700"
    } else if (team == "dunces") {
        color = "bg-pink-500"
    } else {
        color = "bg-orange-950"
    }
    return color
}
</script>

<template>
    <div class="rounded-lg mb-1 hover:cursor-pointer">
        <button class="grid grid-cols-4 p-1 w-full rounded-lg hover:opacity-80 peer focus:opacity-80" :class="teamColor(props.round.winner_team)">
            <span class="text-left">{{ props.round.date }}</span>
            <span class="text-left">{{ props.round.winner_team }}</span>
            <span class="text-left">{{ props.round.player_count }}</span>
        </button>
        <div v-for="player in props.round.playerInRound" class="grid-cols-4 pb-4 hidden peer-focus:grid">
            <span :class="{ 'font-bold': player.win == 1 }">{{ player.playername }}<span v-if="player.alive == 0">&#10005</span></span>
            <span>{{ player.team }}</span>
            <span>{{ player.role }}</span>
        </div>
    </div>
</template>