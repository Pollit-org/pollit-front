<template>
  <v-app-bar flat color="primary">
    <v-app-bar-title class="title">
      <v-icon :icon=logo />
      Pollit
    </v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts" setup>
import logo from "@/components/icons/Logo.vue"
</script>

<style>
.title .v-toolbar-title__placeholder {
  display: flex !important;
  align-items: flex-end !important;
}
</style>