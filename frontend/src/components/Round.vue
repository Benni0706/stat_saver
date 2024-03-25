<script setup>
const props = defineProps(['round'])

let color = "bg-gray-500"
if (props.round.winner_team == "innocents") {
    color = "bg-green-500"
} else if (props.round.winner_team == "traitors") {
    color = "bg-red-600"
} else if (props.round.winner_team == "nones") {
    color = "bg-gray-500"
} else {
    color = "bg-orange-950"
}
</script>

<template>
    <div :class="'rounded-lg mb-1 hover:cursor-pointer overflow-hidden h-8 line-clamp-1 hover:h-fit hover:line-clamp-none group'">
        <div :class="'grid grid-cols-4 p-1 rounded-lg group-hover:opacity-80 ' + color">
            <span>{{ props.round.date }}</span>
            <span> {{ props.round.winner_team }}</span>
            <span>{{ props.round.player_count }}</span>
        </div>
        <div v-for="player in props.round.playerInRound" class="grid grid-cols-3 pb-4">
            <span>{{ player.playername }}</span>
            <span>{{ player.team }}</span>
            <span>{{ player.role }}</span>
        </div>
    </div>
</template>