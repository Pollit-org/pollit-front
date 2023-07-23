<script setup lang="ts">
import Router from 'src/router';
</script>

<template>
  <q-btn
    class="q-px-xl q-mt-md"
    color="positive"
    text-color="dark"
    rounded
    outlined
    @click="Router.push({ name: 'Home' })"
    >Back to Home</q-btn
  >
</template>
