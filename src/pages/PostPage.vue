<script setup lang="ts">

import PollFull from 'src/components/poll_full_view/PollFull.vue';
import PollitPage from 'src/components/PollitPage.vue';
import { Post } from 'src/models/interfaces';

// interface Props {
//     post : Post
// }

// const props = defineProps<Props>()

const post : Post = {
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
}

</script>

<template>
    <pollit-page>
      <poll-full :post="post"></poll-full>
    </pollit-page>
</template>