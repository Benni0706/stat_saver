<script setup>
import { ref } from 'vue'
import Round from "@/components/Round.vue"

document.title = "TTT Legoland Stats"

const players = ref()
const rounds = ref()
const tab = ref(0)

const response = await fetch("http://localhost:3000/stats")
const stats = await response.json()
players.value = stats.player
rounds.value = stats.round

console.log(stats)
console.log(players.value)
console.log(rounds.value)

</script>

<template>
  <div class="bg-gray-400 h-screen">
    <h1 class="bg-red-500 text-center text-4xl p-2">TTT Legoland Stats</h1>
    <div class="flex p-2 justify-center">
      <button :disabled="tab == 0" @click="tab = 0" class="bg-gray-700 rounded-lg mx-1 py-1 px-4 text-2xl disabled:bg-gray-800 hover:bg-gray-800">Runden</button>
      <button :disabled="tab == 1" @click="tab = 1" class="bg-gray-700 rounded-lg mx-1 py-1 px-4 text-2xl disabled:bg-gray-800 hover:bg-gray-800">Spieler</button>
    </div>
    <div class="bg-gray-700 h-full rounded-xl mx-2">
      <div v-if="tab == 0" class="p-2">
        <Round v-for="round in rounds" :round="round" />
      </div>
    </div>
  </div>
</template>