<script setup lang="ts">
import PollBottomBar from './PollBottomBar.vue';
import PollOptions from './PollOptions.vue';
import PollTitle from './PollTitle.vue';
import PollHeader from './PollHeader.vue';
import { provide, ref } from 'vue';
import PollResults from './PollResults.vue'
import { postInjectionKey } from './injection_keys';
import { Poll } from 'src/api/models/poll';

interface Props {
  poll: Poll;
}
const props = defineProps<Props>();
provide(postInjectionKey, props.poll);

const hovered = ref(false);
</script>

<template >
  <q-card
    :key="props.poll.pollId + props.poll.hasMyVote + props.poll.totalVotesCount"
    @mouseover="hovered = true"
    @mouseleave="hovered = false"
    :bordered="hovered"
    class="q-mt-md q-mt-md bg-white"
  >
    <poll-header />
    <poll-title />
    <poll-options :poll="poll" v-if="!props.poll.hasMyVote"/>
    <poll-results :poll="poll" v-if="props.poll.hasMyVote"/>
    <poll-bottom-bar style="z-index: -1" />
  </q-card>
</template>
