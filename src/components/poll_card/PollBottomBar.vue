<script setup lang="ts">
import { Poll } from 'src/api/models/poll';
import { inject } from 'vue';
import { postInjectionKey } from './injection_keys';

const poll = inject(postInjectionKey) as Poll;

// const sumComments = function (comments: Comment[]): number {
//   const reducer = (sum: number, comment: Comment): number =>
//     sum +
//     (Array.isArray(comment.replies) && comment.replies.length > 0
//       ? 1 + sumComments(comment.replies)
//       : 1);
//   return comments.reduce(reducer, 0);
// };

//const totalComments = sumComments(poll.comments);
</script>

<template>
  <q-card-actions class="row justify-between q-pb-xs">
    <div class="row items-center inline">
      <q-icon name="o_poll" size="1.2rem" class="q-mr-xs" />
      <span class="poll-votes text-weight-bold" style="font-size: 0.8rem">{{
        poll.totalVotesCount
      }}</span>
    </div>
    <q-btn flat class="row items-center">
      <q-icon name="o_forum" size="1rem" class="q-mr-xs" />
      <span class="poll-comments" style="font-size: 0.7rem"
        >{{ poll.commentCount }}</span
      >
    </q-btn>
    <q-btn round flat class="poll-share" icon="share" size="sm" />
  </q-card-actions>
</template>
