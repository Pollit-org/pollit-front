<script setup lang="ts">
import { Poll } from 'src/api/models/poll';
import { inject } from 'vue';
import { postInjectionKey } from './injection_keys';
import moment from 'moment';

const poll = inject(postInjectionKey) as Poll;

</script>

<template>
  <q-card-section>
      <span style="font-size: 0.75rem; color: rgb(80, 80, 80) ;">{{ poll.author }}</span>
      <span class="q-mx-xs">&centerdot;</span>
      <span class="text-italic" style="font-size: 0.7rem; color: rgb(150, 150, 150) ;">
        {{ moment(poll.createdAt).fromNow() }}
      </span>
  </q-card-section>
</template>
