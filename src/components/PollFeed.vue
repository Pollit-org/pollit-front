<script setup lang="ts">
import { ref, watch } from 'vue';
import PollCard from './poll_card/PollCard.vue';
import PollForm from './PollForm.vue';
import { usePollStore } from 'src/stores/poll-store';
import { QInfiniteScroll } from 'quasar';
import { viewPoll } from 'src/misc/viewPoll';
import PollFeedFilters from './PollFeedFilters.vue';

interface Props {
  search?: string;
  tags?: string;
}

const props = withDefaults(defineProps<Props>(), {});
const pollStore = usePollStore();

const setFilters = () =>
  pollStore.setFilters(
    Object.assign(pollStore.filters, {
      search: props.search ?? null,
      tags: props.tags?.split(' ') ?? null,
  }));

const onPropsChanged = () => {
  pollStore.reset();
  setFilters();
  infiniteScroll.value?.setIndex(0);
  infiniteScroll.value?.resume();
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const infiniteScroll = ref<QInfiniteScroll>(null!);
watch(() => props, onPropsChanged, {
  immediate: true,
  deep: true,
});

const onLoadRef = (index: number, done: (stop?: boolean) => void) => {
  pollStore.fetchMore().then((hasMore) => done(!hasMore));
};
</script>

<template>
  <div>
    <poll-form class="q-pt-sm" />
    <poll-feed-filters class="q-pt-sm"></poll-feed-filters>
    <q-infinite-scroll class="q-pt-sm" ref="infiniteScroll" @load="onLoadRef" :offset="250">
      <poll-card
        v-for="poll in pollStore.$state.polls"
        :key="poll.pollId + poll.hasMyVote + poll.totalVotesCount"
        :poll="poll"
        class="cursor-pointer q-mb-sm"
        @click="viewPoll(poll.pollId)"
      />
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>
