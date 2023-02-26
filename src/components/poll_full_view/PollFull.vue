<script setup lang="ts">
import PollCard from '../poll_card/PollCard.vue';
export interface Props {
  username?: string;
  timeSincePost?: string;
  title?: string;
  options?: { text: string; votes: number }[];
  tags?: { text: string; link: string }[];
}

const props = withDefaults(defineProps<Props>(), {
  username: 'User1',
  timeSincePost: '5 hours ago',
  title: 'What is your favorite color?',
  options: () => [
    { text: 'Red', votes: 20 },
    { text: 'Green', votes: 15 },
    { text: 'Blue', votes: 25 },
  ],
  tags: () => [
    { text: 'color', link: 'color' },
    { text: 'favorite', link: 'favorite' },
    { text: 'blabla', link: 'blabla' },
    { text: 'yeslife', link: 'yeslife' },
  ],
});
</script>

<template>
  <poll-card
    :title="props.title"
    :username="props.username"
    :time-since-post="props.timeSincePost"
    :options="props.options"
    :tags="props.tags"
  />
  <poll-comment-section />
</template>
