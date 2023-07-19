<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Poll } from 'src/api/models/poll';
import { usePollStore } from 'src/stores/poll-store';

interface Props {
  poll: Poll;
}

const props = defineProps<Props>();

const pollStore = usePollStore();
const voteOptions = ref<object[]>([]);
for (const option of props.poll.options) {
  voteOptions.value.push({ label: option.title, value: option.id });
}
const selectedOption = ref<string | null>(null);

const allOptionsVoteCountsAreZero = ref(true);
onMounted(() => {
  setTimeout(() => (allOptionsVoteCountsAreZero.value = false), 300);
});

const onVoteButtonClick = () => {
  if (selectedOption.value !== null) {
    pollStore.castVoteToPoll(props.poll.pollId, selectedOption.value);
  }
};
</script>

<template>
  <q-card-section
    :key="poll.pollId + poll.hasMyVote + poll.totalVotesCount"
    class="poll-options"
  >
    <q-option-group
      class="q-pb-sm"
      :options="voteOptions"
      type="radio"
      v-model="selectedOption"
    />
    <q-btn
      rounded
      size="sm"
      @click="onVoteButtonClick"
      :disabled="selectedOption === null"
      label="Vote"
      color="accent"
    />
  </q-card-section>
</template>
