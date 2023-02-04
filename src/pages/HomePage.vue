<template>
  <pollit-page>
    <poll-list></poll-list>
  </pollit-page>
</template>

<script setup lang="ts">
import PollList from 'src/components/feed/PollList.vue';
import Router from 'src/router';
import { useConnectedUserStore } from 'src/stores/connected-user-store';
import PollitPage from 'src/components/PollitPage.vue';

const connectedUserStore = useConnectedUserStore();

const signin = () => {
  Router.push({ name: 'Signin' });
};
</script>
