<template>
    <q-toolbar-title shrink @click="showHome" class="cursor-pointer">
        Pollit
    </q-toolbar-title>
</template>

<script setup lang="ts">
import Router from 'src/router';

const showHome = () => Router.push({ name: 'Home' })
</script>