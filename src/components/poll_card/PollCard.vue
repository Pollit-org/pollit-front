<script setup lang="ts">
import PollBottomBar from './PollBottomBar.vue';
import PollOptions from './PollOptions.vue';
import PollTitle from './PollTitle.vue';
import PollHeader from './PollHeader.vue';
import { provide } from 'vue';
import PollResults from './PollResults.vue'
import { postInjectionKey } from './injection_keys';
import { Poll } from 'src/api/models/poll';

interface Props {
  poll: Poll;
}
// eslint-disable-next-line vue/no-setup-props-destructure
const {poll} = defineProps<Props>();
provide(postInjectionKey, poll);

</script>

<template >
  <q-card
    :key="poll.pollId + poll.hasMyVote + poll.totalVotesCount"
    class="q-mt-md q-mt-md bg-white"
  >
    <poll-header class="q-pb-none"/>
    <poll-title />
    <poll-options :poll="poll" v-if="!poll.hasMyVote"/>
    <poll-results :poll="poll" v-if="poll.hasMyVote"/>
    <poll-bottom-bar style="z-index: -1" />
  </q-card>
</template>
