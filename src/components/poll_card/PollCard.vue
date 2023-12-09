<script setup lang="ts">
import PollBottomBar from './PollBottomBar.vue';
import PollOptions from './PollOptions.vue';
import PollTitle from './PollTitle.vue';
import PollHeader from './PollHeader.vue';
import PollTags from './PollTags.vue';
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
    class="q-pt-sm q-px-md shadow-1"
  >
    <poll-header class="no-padding"/>
    <poll-title class="no-padding"/>
    <poll-tags class="no-padding" />
    <poll-options class="q-mb-xs" :poll="poll" v-if="!poll.hasMyVote"/>
    <poll-results class="q-mb-xs" :poll="poll" v-if="poll.hasMyVote"/>
    <poll-bottom-bar class="no-padding"/>
  </q-card>
</template>
