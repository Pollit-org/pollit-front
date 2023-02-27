<script setup lang="ts">
import { Post } from 'src/models/interfaces';
import PollCard from '../poll_card/PollCard.vue';
import CommentSection from './CommentSection.vue';
export interface Props {
  post: Post;
}
const props = defineProps<Props>();
</script>

<template>
  <poll-card :post="props.post" class="q-mb-xs"/>
  <comment-section :post="props.post" />
</template>
