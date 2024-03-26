<script setup>
const props = defineProps(['player'])
</script>

<template>
    <div class="rounded-lg mb-1 hover:cursor-pointer">
        <button class="grid grid-cols-4 p-1 w-full rounded-lg hover:opacity-80 peer focus:opacity-80 bg-gray-500">
            <span class="text-left">{{ props.player.name }}</span>
            <span class="text-left">{{ props.player.kills }}</span>
            <span class="text-left">{{ props.player.deaths }}</span>
            <span class="text-left">{{ props.player.kd }}</span>
        </button>
        <div class="hidden peer-focus:block pb-4 pl-2">
            <h2 class="font-bold">Lieblings-Items:</h2>
            <table class="table-auto">
                <tr>
                    <th class="border border-black">Item</th>
                    <th class="border border-black">Gekauft</th>
                </tr>
                <tr v-for="equipment in player.equipment">
                    <td class="border border-black">{{ equipment.label }}</td>
                    <td class="border border-black text-center">{{ equipment.amount }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>