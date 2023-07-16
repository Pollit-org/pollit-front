<script setup lang="ts">
import { Poll } from 'src/api/models/poll';
import { Comment } from 'src/api/models/comment';
import PollCard from '../poll_card/PollCard.vue';
import CommentSection from './CommentSection.vue';

export interface Props {
  poll: Poll;
  comments: Comment[];
}
const props = defineProps<Props>();
</script>

<template>
  <poll-card :poll="props.poll" class="q-mb-xs" />
  <comment-section :comments="props.comments" />
</template>
