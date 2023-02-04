<template>
  <q-layout view="hHh lpr lfr">

    <q-header reveal bordered class="bg-banner text-white">
      <q-toolbar>
        <pollit-toolbar-title/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import PollitToolbarTitle from './components/PollitToolbarTitle.vue';

</script>