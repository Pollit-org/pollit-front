<script setup lang="ts">
import { Poll } from 'src/api/models/poll';
import { inject } from 'vue';
import { postInjectionKey } from './injection_keys';

const poll = inject(postInjectionKey) as Poll;

</script>

<template>
  <q-card-actions class="row justify-between">
    <div class="row items-center inline">
      <q-icon name="o_poll" size="1.1rem" class="q-mr-xs" />
      <span class="poll-votes text-weight-bold" style="font-size: 0.8rem">{{
        poll.totalVotesCount
      }}</span>
    </div>
    <q-btn flat dense no-wrap class="row items-center">
      <q-icon name="o_forum" size="1rem" class="q-mr-xs" />
      <span class="poll-comments" style="font-size: 0.8rem"
        >{{ poll.commentCount }}</span
      >
    </q-btn>
    <q-btn @click.stop="" flat dense no-wrap class="poll-share" icon="share" size="0.7rem" />
  </q-card-actions>
</template>
