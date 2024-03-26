<script setup>
import { ref } from 'vue'
import Round from "@/components/Round.vue"
import Player from "@/components/Player.vue"

document.title = "TTT Legoland Stats"

const players = ref()
const rounds = ref()
const tab = ref(0)
const sortDirection = ref(true)
const lastSortValue = ref("")

const response = await fetch("http://localhost:3000/stats")
const stats = await response.json()
players.value = stats.player
rounds.value = stats.round

function sortBy(data, sortValue) {
  if (lastSortValue.value == sortValue) {
    sortDirection.value = !sortDirection.value
  }
  lastSortValue.value = sortValue

  if (/^[0-9]+$/.test(String(data.value[0][sortValue]))) {
    data.value.sort((a, b) => {
      if (sortDirection.value == true) {
        return b[sortValue] - a[sortValue]
      } else {
        return a[sortValue] - b[sortValue]
      }
    })
  } else {
    data.value.sort((a, b) => {
      if (sortDirection.value == true) {
        return ('' + a[sortValue]).localeCompare(b[sortValue])
      } else {
        return ('' + b[sortValue]).localeCompare(a[sortValue])
      }
    })
  }
}

function sortPlayer(sortValue) {
  sortBy(players, sortValue)
}

function sortRounds(sortValue) {
  sortBy(rounds, sortValue)
}

sortBy(players, "name")
</script>

<template>
  <div class="bg-gray-400 h-full min-h-screen">
    <h1 class="bg-red-500 text-center text-4xl p-2">TTT Legoland Stats</h1>
    <div class="flex p-2 justify-center">
      <button :disabled="tab == 0" @click="tab = 0" class="bg-gray-700 rounded-lg mx-1 py-1 px-4 text-2xl disabled:bg-gray-800 hover:bg-gray-800">Allgemein</button>
      <button :disabled="tab == 1" @click="tab = 1" class="bg-gray-700 rounded-lg mx-1 py-1 px-4 text-2xl disabled:bg-gray-800 hover:bg-gray-800">Runden</button>
      <button :disabled="tab == 2" @click="tab = 2" class="bg-gray-700 rounded-lg mx-1 py-1 px-4 text-2xl disabled:bg-gray-800 hover:bg-gray-800">Spieler</button>
    </div>
    <div class="bg-gray-700 h-full min-h-screen rounded-xl mx-2">
      <div v-if="tab == 0" class="p-2">
        <p class="text-center w-full text-4xl font-bold">{{ rounds.length }} Runden</p>
        <p class="text-center">seit {{ rounds[0].date.split('-')[0] }}</p>
      </div>
      <div v-else-if="tab == 1" class="p-2">
        <div class="grid grid-cols-4 p-1 font-bold">
          <span>Datum</span>
          <span>Sieger</span>
          <span>Spieleranzahl</span>
        </div>
        <Round v-for="round in rounds" :round="round"/>
      </div>
      <div v-else-if="tab == 2" class="p-2">
        <div class="grid grid-cols-4 p-1 font-bold">
          <span :class="{ 'underline': lastSortValue == 'name' && sortDirection == true, 'overline': lastSortValue == 'name' && sortDirection == false }" class="w-fit hover:opacity-80 hover:cursor-pointer" @click="sortPlayer('name')">Spieler</span>
          <span :class="{ 'underline': lastSortValue == 'kills' && sortDirection == true, 'overline': lastSortValue == 'kills' && sortDirection == false }" class="w-fit hover:opacity-80 hover:cursor-pointer" @click="sortPlayer('kills')">Kills</span>
          <span :class="{ 'underline': lastSortValue == 'deaths' && sortDirection == true, 'overline': lastSortValue == 'deaths' && sortDirection == false }" class="w-fit hover:opacity-80 hover:cursor-pointer" @click="sortPlayer('deaths')">Tode</span>
          <span :class="{ 'underline': lastSortValue == 'kd' && sortDirection == true, 'overline': lastSortValue == 'kd' && sortDirection == false }" class="w-fit hover:opacity-80 hover:cursor-pointer" @click="sortPlayer('kd')">K/D</span>
        </div>
        <Player v-for="player in players" :player="player"/>
      </div>
    </div>
  </div>
</template>