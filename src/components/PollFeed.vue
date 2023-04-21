<script setup lang="ts">
import { ref } from 'vue';
import PollCard from './poll_card/PollCard.vue';
import Router from 'src/router';
import { usePollStore } from 'src/stores/poll-store';
import { Poll } from 'src/api/models/poll';

const pollStore = usePollStore();

const feed = ref({
  posts: [
    {
      user: {
        username: 'didou',
        profileLink: '/u/didou',
      },
      title: 'What do you drink for breakfast ?',
      timeSincePost: '2 days ago',
      votingOptions: [
        {
          name: 'coffee',
          numVotes: 45,
        },
        {
          name: 'tea',
          numVotes: 35,
        },
      ],
      tags: [
        {
          name: 'breakfast',
          link: 'breakfast',
        },
      ],
      comments: [
        {
          user: {
            username: 'didou',
            profileLink: '/u/didou',
          },
          timeSincePost: '38 mins ago',
          upvotes: 18,
          downvotes: 8,
          commentText: 'Gigachads drink tea',
          replies: [
            {
              user: {
                username: 'flow',
                profileLink: '/u/flow',
              },
              timeSincePost: '33 mins ago',
              upvotes: 12,
              downvotes: 3,
              commentText: 'Better be a gigachad then',
              replies: [],
            },
            {
              user: {
                username: 'flow',
                profileLink: '/u/flow',
              },
              timeSincePost: '33 mins ago',
              upvotes: 0,
              downvotes: 0,
              commentText: 'are you a gigachad ?',
              replies: [
                {
                  user: {
                    username: 'didou',
                    profileLink: '/u/didou',
                  },
                  timeSincePost: '31 mins ago',
                  upvotes: 10,
                  downvotes: 0,
                  commentText: 'ask your mom',
                  replies: [],
                },
              ],
            },
          ],
        },
        {
          user: {
            username: 'didou',
            profileLink: '/u/didou',
          },
          timeSincePost: '38 mins ago',
          upvotes: 18,
          downvotes: 8,
          commentText: 'Gigachads drink tea',
          replies: [
            {
              user: {
                username: 'flow',
                profileLink: '/u/flow',
              },
              timeSincePost: '33 mins ago',
              upvotes: 12,
              downvotes: 3,
              commentText: 'Better be a gigachad then',
              replies: [],
            },
            {
              user: {
                username: 'flow',
                profileLink: '/u/flow',
              },
              timeSincePost: '33 mins ago',
              upvotes: 0,
              downvotes: 0,
              commentText: 'are you a gigachad ?',
              replies: [
                {
                  user: {
                    username: 'didou',
                    profileLink: '/u/didou',
                  },
                  timeSincePost: '31 mins ago',
                  upvotes: 10,
                  downvotes: 0,
                  commentText: 'ask your mom',
                  replies: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

const postsCopy = feed.value.posts.slice(0);

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
