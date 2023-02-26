<script setup lang="ts">
import { ref } from 'vue';

const items = ref([{}, {}, {}, {}, {}, {}, {}]);
</script>
<template>
  <q-card>
    <q-card-section>
      <recursive-comment v-for="(item, index) in items" :key="index" />
    </q-card-section>
  </q-card>
</template>
