<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Poll } from 'src/api/models/poll';
import { usePollStore } from 'src/stores/poll-store';
import { showSigninPopupIfNotConnected } from 'src/misc/ShowSigninPopupIfNotConnected';
import { useConnectedUserStore } from 'src/stores/connected-user-store';
import { viewPoll } from 'src/misc/viewPoll';

interface Props {
  poll: Poll;
}

const props = defineProps<Props>();

const pollStore = usePollStore();
const connectedUserStore = useConnectedUserStore();

const voteOptions = ref<object[]>([]);

const selectedOption = ref<string | null>(null);

const allOptionsVoteCountsAreZero = ref(true);
onMounted(() => {
  for (const option of props.poll.options) {
    voteOptions.value.push({ label: option.title, value: option.id });
  }
  setTimeout(() => (allOptionsVoteCountsAreZero.value = false), 300);
});

const onVoteButtonClick = () => {
  if (selectedOption.value !== null) {
    pollStore.castVoteToPoll(props.poll.pollId, selectedOption.value);
  }
  if (connectedUserStore.eventAfterSignIn !== null) {
    connectedUserStore.setEventAfterSignIn(null);
    viewPoll(props.poll.pollId);
  }
};
</script>

<template>
  <q-card-section
    :key="poll.pollId + poll.hasMyVote + poll.totalVotesCount"
    style="border: 1px solid rgb(180, 180, 180); border-width: 1px 0"
    class="q-py-sm  q-px-none"
  >
    <q-option-group
      class="q-mb-xs"
      :options="voteOptions"
      type="radio"
      v-model="selectedOption"
    />
    <q-btn
      rounded
      size="sm"
      @click.stop="showSigninPopupIfNotConnected(onVoteButtonClick)"
      :disabled="selectedOption === null"
      label="Vote"
      color="accent"
    />
  </q-card-section>
</template>
