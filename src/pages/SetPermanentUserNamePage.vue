<script setup lang="ts">
import PermanentUserNameForm from 'src/components/authent/PermanentUserNameForm.vue';
import { useConnectedUserStore } from 'src/stores/connected-user-store';

const connectedUserStore = useConnectedUserStore();

</script>

<template>
    <q-page class="flex justify-center text-center q-mx-none q-px-none">
    <div class="self-center" style="width: 80%; max-width: 344px;">
        <h1 class="q-mb-lg q-mt-none q-pt-none">Choose a user name</h1>
        <span>It will be visible by other users.<br>It cannot be changed.</span>
        <permanent-user-name-form class="q-px-md q-mt-lg"/>
        <q-btn @click="connectedUserStore.signout">Signout</q-btn>
    </div>
  </q-page>
</template>
