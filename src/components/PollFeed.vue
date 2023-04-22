<script setup lang="ts">
import { ref } from 'vue';
import PollCard from './poll_card/PollCard.vue';
import Router from 'src/router';
import { usePollStore } from 'src/stores/poll-store';
import { Poll } from 'src/api/models/poll';

const pollStore = usePollStore();

const viewPoll = (poll: Poll) => {
  Router.push({
    name: 'Poll',
    params: {
      pollId: poll.pollId,
    },
  });
};

const onLoadRef = (index: number, done: (stop?: boolean) => void) => {
  pollStore.fetchMore().then((hasMore) => done(!hasMore));
};
</script>

<template>
  <div>
    <q-infinite-scroll @load="onLoadRef" :offset="250">
      <poll-card
        v-for="poll in pollStore.$state.polls"
        :key="poll.pollId"
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
