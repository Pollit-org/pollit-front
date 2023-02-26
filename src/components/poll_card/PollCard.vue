<script setup lang="ts">
import PollBottomBar from './PollBottomBar.vue';
import PollOptions from './PollOptions.vue';
import PollTitle from './PollTitle.vue';
import PollHeader from './PollHeader.vue';
export interface Props {
  username: string;
  timeSincePost: string;
  title: string;
  options: { text: string; votes: number }[];
  tags: { text: string; link: string }[];
}

const props = defineProps<Props>();

const totalVotes = props.options.reduce((sum, current) => sum + current.votes, 0);
const totalComments = 26;
</script>

<template>
  <q-card class="poll-post q-mt-md q-mt-md bg-white cursor-pointer">
    <poll-header
      :username="props.username"
      :time-since-post="props.timeSincePost"
      :tags="props.tags"
    />
    <poll-title :title="props.title" />
    <poll-options :options="props.options" />
    <poll-bottom-bar :total-votes="totalVotes" :total-comments="totalComments" />
  </q-card>
</template>
