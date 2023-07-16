<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { postInjectionKey } from './injection_keys';
import { Poll, PollOption } from 'src/api/models/poll';
import { usePollStore } from 'src/stores/poll-store';

//const poll = inject(postInjectionKey) as Poll;
interface Props {
  poll: Poll;
}

const props = defineProps<Props>();

const pollStore = usePollStore();

const onClickOnOption = (evt: Event, optionId: string) => {
  evt.stopImmediatePropagation();
  if (!props.poll.hasMyVote) {
    pollStore.castVoteToPoll(props.poll.pollId, optionId);
  }
};

const allOptionsVoteCountsAreZero = ref(true);
onMounted(() => {
  setTimeout(() => (allOptionsVoteCountsAreZero.value = false), 300);
});

const buildOptionKey: (option: PollOption) => string = (option) => {
  return option.id + option.hasMyVote + option.votesCount;
};
</script>

<template>
  <q-card-section
    :key="poll.pollId + poll.hasMyVote + poll.totalVotesCount"
    class="poll-options"
  >
    <!-- <q-scroll-area style="height: 100px; max-height: 180px"> -->
    <q-list bordered separator dense>
      <template v-for="option in poll.options" :key="buildOptionKey(option)">
        <q-item
          :class="poll.hasMyVote ? 'cursor-not-allowed' : ''"
          clickable
          :active="option.hasMyVote"
          @click="($event) => onClickOnOption($event, option.id)"
        >
          <q-item-section>
            <q-item-label>{{ option.title }}</q-item-label>
          </q-item-section>
          <q-item-section v-if="poll.hasMyVote" side>
            <q-item-label caption
              >{{ option.votesCount }} ({{
                ((option.votesCount ?? 0) / poll.totalVotesCount) * 100
              }}%)</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-linear-progress
          animation-speed="1000"
          :color="option.hasMyVote ? 'primary' : 'secondary'"
          :value="
            allOptionsVoteCountsAreZero
              ? 0
              : (option.votesCount ?? 0) / poll.totalVotesCount
          "
        />
      </template>
    </q-list>
    <!-- </q-scroll-area> -->
  </q-card-section>
</template>

<style>
</style>
