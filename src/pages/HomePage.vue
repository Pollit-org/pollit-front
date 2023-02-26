<template>
  <pollit-page>
    <poll-feed></poll-feed>
  </pollit-page>
</template>

<script setup lang="ts">
import PollFeed from 'src/components/PollFeed.vue';
import Router from 'src/router';
import { useConnectedUserStore } from 'src/stores/connected-user-store';
import PollitPage from 'src/components/PollitPage.vue';

const connectedUserStore = useConnectedUserStore();

const signin = () => {
  Router.push({ name: 'Signin' });
};
</script>
