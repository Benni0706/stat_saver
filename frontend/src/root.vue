<script setup>
import App from "./App.vue"
</script>

<template>
    <Suspense>
        <App />
        <template #fallback>
            site is loading...
        </template>
    </Suspense>
</template>