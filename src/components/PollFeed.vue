<script setup lang="ts">
import { ref, watch } from 'vue';
import PollCard from './poll_card/PollCard.vue';
import PollForm from './PollForm.vue';
import Router from 'src/router';
import { usePollStore } from 'src/stores/poll-store';
import { Poll } from 'src/api/models/poll';
import { QInfiniteScroll } from 'quasar';

interface Props {
  search?: string;
  tags?: string;
}

const props = withDefaults(defineProps<Props>(), {});

const pollStore = usePollStore();

const viewPoll = (poll: Poll) => {
  Router.push({
    name: 'Poll',
    params: {
      pollId: poll.pollId,
    },
  });
};

const setFilters = () =>
  pollStore.setFilters({
    search: props.search ?? null,
    tags: props.tags?.split(' ') ?? null,
  });

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
    <q-infinite-scroll ref="infiniteScroll" @load="onLoadRef" :offset="250">
      <poll-form class="q-pt-sm"></poll-form>
      <poll-card
        v-for="poll in pollStore.$state.polls"
        :key="poll.pollId + poll.hasMyVote + poll.totalVotesCount"
        :poll="poll"
        class="cursor-pointer"
        @click="viewPoll(poll)"
      />
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>
