<script setup lang="ts">
import { Post, Comment } from 'src/models/interfaces';
import { inject } from 'vue';
import { postInjectionKey } from './injection_keys';

const post = inject(postInjectionKey) as Post;

const totalVotes = post.votingOptions.reduce((sum, current) => sum + current.numVotes, 0);

const sumComments = function (comments: Comment[]): number {
  const reducer = (sum: number, comment: Comment): number =>
    sum +
    (Array.isArray(comment.replies) && comment.replies.length > 0
      ? 1 + sumComments(comment.replies)
      : 1);
  return comments.reduce(reducer, 0);
};

const totalComments = sumComments(post.comments);
</script>

<template>
  <q-card-actions class="row justify-between q-pb-xs">
    <div class="row items-center inline">
      <q-icon name="o_poll" size="1.2rem" class="q-mr-xs" />
      <span class="poll-votes text-weight-bold" style="font-size: 0.8rem">{{
        totalVotes
      }}</span>
    </div>
    <q-btn flat class="row items-center">
      <q-icon name="o_forum" size="1rem" class="q-mr-xs" />
      <span class="poll-comments" style="font-size: 0.7rem"
        >{{ totalComments }} Comments</span
      >
    </q-btn>
    <q-btn round flat class="poll-share" icon="share" size="sm"/>
  </q-card-actions>
</template>
