<script setup>
import equipNames from "@/assets/equipNames.json"

const props = defineProps(['player'])

function getEquipNames(equipment) {
  if (equipNames[equipment] || equipNames[equipment] == "") {
    return equipNames[equipment]
  } else {
    return equipment
  }
}

</script>

<template>
    <div class="rounded-lg mb-1">
        <button class="grid grid-cols-8 p-1 w-full rounded-lg hover:opacity-80 peer focus:ring focus:opacity-80 bg-gray-500 hover:cursor-pointer">
            <span class="text-left">{{ props.player.name }}</span>
            <span class="text-left">{{ props.player.roundsPlayed }}</span>
            <span class="text-left">{{ props.player.wins }}</span>
            <span class="text-left">{{ props.player.loses }}</span>
            <span class="text-left">{{ props.player.winrate }}</span>
            <span class="text-left">{{ props.player.kills }}</span>
            <span class="text-left">{{ props.player.deaths }}</span>
            <span class="text-left">{{ props.player.kd }}</span>
        </button>
        <div class="hidden peer-focus:grid grid-cols-3 pb-4 pl-2 mt-1">
            <div>
                <h2 class="font-bold">Winrates per Team:</h2>
                <div class="overflow-y-scroll max-h-80 w-fit border border-black">
                    <table class="table-auto overflow-scroll max-h-40">
                        <tr class="sticky top-0 bg-gray-700">
                            <th class="p-1">Team</th>
                            <th class="p-1">Runden</th>
                            <th class="p-1">Winrate</th>
                        </tr>
                        <tr v-for="team in player.winratePerTeam" class="border-black border-y">
                            <td>{{ team.team }}</td>
                            <td class="text-center">{{ team.wins + team.loses }}</td>
                            <td class="text-center">{{ Math.round(team.wins / (team.loses + team.wins) * 100)/100 }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div>
                <h2 class="font-bold">Winrates per Rolle:</h2>
                <div class="overflow-y-scroll max-h-80 w-fit border border-black">
                    <table class="table-auto">
                        <tr class="sticky top-0 bg-gray-700">
                            <th class="p-1">Rolle</th>
                            <th class="p-1">Runden</th>
                            <th class="p-1">Winrate</th>
                        </tr>
                        <tr v-for="role in player.winratePerRole" class="border-black border-y">
                            <td>{{ role.role }}</td>
                            <td class="text-center">{{ role.wins + role.loses }}</td>
                            <td class="text-center">{{ Math.round(role.wins / (role.loses + role.wins) * 100)/100 }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div>
                <h2 class="font-bold">Lieblings-Items:</h2>
                <div class="overflow-y-scroll max-h-80 w-fit border border-black">
                    <table class="table-auto">
                        <tr class="sticky top-0 bg-gray-700">
                            <th class="p-1">Item</th>
                            <th class="p-1">Gekauft</th>
                        </tr>
                        <tr v-for="equipment in player.equipment" class="border-black border-y">
                            <td>{{ getEquipNames(equipment.label) }}</td>
                            <td class="text-center">{{ equipment.amount }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
