<script setup lang="ts">
import { ref } from 'vue';
import PollCard from './poll_card/PollCard.vue';

const baseItems = ref(
  Array(5).fill({
    username: 'didou',
    timeSincePost: '3 hours ago',
    title: 'What would you like for breakfast ?',
    options: [
      {
        text: 'eggs',
        votes: 45,
      },
      {
        text: 'bread',
        votes: 32,
      },
    ],
    tags: [
      {
        text: 'breakfast',
        link: 'breakast',
      },
      {
        text: 'morning',
        link: 'morning',
      },
    ],
  })
);

const newItems = baseItems.value.slice(0);

const onLoadRef = (index, done) => {
  setTimeout(() => {
    baseItems.value.push(...newItems);
    done();
  }, 2000);
};
</script>

<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="onLoadRef" :offset="250">
      <poll-card
        v-for="(item, index) in baseItems"
        :key="index"
        :username="item.username"
        :time-since-post="item.timeSincePost"
        :title="item.title"
        :options="item.options"
        :tags="item.tags"
      />
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>
