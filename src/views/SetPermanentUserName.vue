<script setup lang="ts">
import PermanentUserNameForm from '@/components/authent/PermanentUserNameForm.vue';
</script>

<template>
  <v-container class="fill-height">
    <v-responsive max-width="688" class="d-flex align-center text-center fill-height mx-auto">
        <h1 class="mb-8">Choose a user name</h1>
        <span>It will be visible by other users.<br>It cannot be changed.</span>
        <permanent-user-name-form class="px-5 mt-8"/>
    </v-responsive>
  </v-container>
</template>
