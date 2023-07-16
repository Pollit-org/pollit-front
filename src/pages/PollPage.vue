<script setup lang="ts">
import PollFull from 'src/components/poll_full_view/PollFull.vue';
import PollitPage from 'src/components/PollitPage.vue';
import { usePollStore } from 'src/stores/poll-store';

interface Props {
  pollId: string;
}

const props = defineProps<Props>();

const pollStore = usePollStore();

pollStore.setCurrentPoll(props.pollId);
</script>

<template>
  <pollit-page :is-404="pollStore.currentPollNotFound">
    <poll-full
      :poll="pollStore.currentPoll"
      :comments="pollStore.currentPollComments"
    ></poll-full>
  </pollit-page>
</template>