<script setup lang="ts">
import SignIn from 'components/SignIn.vue';
import PollitPage from 'components/PollitPage.vue';
import Router from 'src/router';
</script>

<template>
  <pollit-page vertical-center :has-back-button="false" text-center max-width="344px">
    <sign-in />
  </pollit-page>
</template>
