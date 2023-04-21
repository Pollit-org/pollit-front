<script setup lang="ts">
import PollFull from 'src/components/poll_full_view/PollFull.vue';
import PollitPage from 'src/components/PollitPage.vue';
import { usePollStore } from 'src/stores/poll-store';

interface Props {
  pollId: string;
}

const props = defineProps<Props>();

// const post : Post = {
//   user: {
//     username: 'didou',
//     profileLink: '/u/didou',
//   },
//   title: 'What do you drink for breakfast ?',
//   timeSincePost: '2 days ago',
//   votingOptions: [
//     {
//       name: 'coffee',
//       numVotes: 45,
//     },
//     {
//       name: 'tea',
//       numVotes: 35,
//     },
//   ],
//   tags: [
//     {
//       name: 'breakfast',
//       link: 'breakfast',
//     },
//   ],
//   comments: [
//     {
//       user: {
//         username: 'didou',
//         profileLink: '/u/didou',
//       },
//       timeSincePost: '38 mins ago',
//       upvotes: 18,
//       downvotes: 8,
//       commentText: 'Gigachads drink tea',
//       replies: [
//         {
//           user: {
//             username: 'flow',
//             profileLink: '/u/flow',
//           },
//           timeSincePost: '33 mins ago',
//           upvotes: 12,
//           downvotes: 3,
//           commentText: 'Better be a gigachad then',
//           replies: [],
//         },
//         {
//           user: {
//             username: 'flow',
//             profileLink: '/u/flow',
//           },
//           timeSincePost: '33 mins ago',
//           upvotes: 0,
//           downvotes: 0,
//           commentText: 'are you a gigachad ?',
//           replies: [
//             {
//               user: {
//                 username: 'didou',
//                 profileLink: '/u/didou',
//               },
//               timeSincePost: '31 mins ago',
//               upvotes: 10,
//               downvotes: 0,
//               commentText: 'ask your mom',
//               replies: [],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       user: {
//         username: 'didou',
//         profileLink: '/u/didou',
//       },
//       timeSincePost: '38 mins ago',
//       upvotes: 18,
//       downvotes: 8,
//       commentText: 'Gigachads drink tea',
//       replies: [
//         {
//           user: {
//             username: 'flow',
//             profileLink: '/u/flow',
//           },
//           timeSincePost: '33 mins ago',
//           upvotes: 12,
//           downvotes: 3,
//           commentText: 'Better be a gigachad then',
//           replies: [],
//         },
//         {
//           user: {
//             username: 'flow',
//             profileLink: '/u/flow',
//           },
//           timeSincePost: '33 mins ago',
//           upvotes: 0,
//           downvotes: 0,
//           commentText: 'are you a gigachad ?',
//           replies: [
//             {
//               user: {
//                 username: 'didou',
//                 profileLink: '/u/didou',
//               },
//               timeSincePost: '31 mins ago',
//               upvotes: 10,
//               downvotes: 0,
//               commentText: 'ask your mom',
//               replies: [],
//             },
//           ],
//         },
//       ],
//     },
//   ],
// }
const pollStore = usePollStore();

pollStore.setCurrentPollId(props.pollId);
</script>

<template>
  <pollit-page
    v-if="
      pollStore.currentPoll != null && pollStore.currentPollComments != null
    "
  >
    <poll-full
      :poll="pollStore.currentPoll"
      :comments="pollStore.currentPollComments"
    ></poll-full>
  </pollit-page>
</template>