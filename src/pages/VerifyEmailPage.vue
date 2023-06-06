<script setup lang="ts">
import PollitPage from 'src/components/PollitPage.vue';
import Router from 'src/router';
import { useConnectedUserStore } from 'src/stores/connected-user-store';
import { Ref, ref } from 'vue';

interface Props {
  userId: string;
  emailVerificationToken: string;
}

const props = defineProps<Props>();

const goToSignin = () => Router.push({ name: 'Signin' });
const goToHome = () => Router.push({ name: 'Home' });

var connectedUserStore = useConnectedUserStore();
let emailVerifiedWithSuccess: Ref<boolean | null> = ref(null);
(async () => {
  emailVerifiedWithSuccess.value = await connectedUserStore.verifyEmailFromLink(
    props.userId,
    props.emailVerificationToken
  );
})();

console.log(emailVerifiedWithSuccess);
</script>

<template>
  <pollit-page vertical-center text-center>
    <h1 v-if="!emailVerifiedWithSuccess" class="q-mb-lg q-mt-none q-pt-none">
      We could not verify your email :(
    </h1>
    <h1 v-if="emailVerifiedWithSuccess" class="q-mb-lg q-mt-none q-pt-none">
      Your email is now verified.
    </h1>
    <q-btn
      v-if="emailVerifiedWithSuccess && connectedUserStore.user == null"
      class="q-mt-sm"
      rounded
      outline
      color="info"
      @click="goToSignin"
    >
      <small>Sign in</small>
    </q-btn>
    <q-btn
      v-if="emailVerifiedWithSuccess && connectedUserStore.user != null"
      class="q-mt-sm"
      rounded
      outline
      color="info"
      @click="goToHome"
    >
      <small>Start polling !</small>
    </q-btn>
  </pollit-page>
</template>
