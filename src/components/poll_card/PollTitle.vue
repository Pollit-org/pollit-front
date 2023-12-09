<script setup lang="ts">
import { inject } from 'vue';
import { postInjectionKey } from './injection_keys';
import { Poll } from 'src/api/models/poll';

const poll = inject(postInjectionKey) as Poll;
</script>

<template>
  <q-card-section style="font-size: 1.2rem; font-weight: 700;">{{
    poll.title
  }}</q-card-section>
</template>
