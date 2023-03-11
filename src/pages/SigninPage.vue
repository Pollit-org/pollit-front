<script setup lang="ts">
import GoogleSignin from 'components/authent/GoogleSignin.vue';
import CredentialsSigninForm from 'components/authent/CredentialsSigninForm.vue';
import PollitPage from 'components/PollitPage.vue';
import Router from 'src/router';
import { useGlobalStore } from 'src/stores/global-store';

const globalStore = useGlobalStore();

const goToSignup = () => Router.push({ name: 'Signup' });
</script>

<template>
  <pollit-page
    show-spinner-on-load
    vertical-center
    class="text-center"
    max-width="344px"
  >
    <h1 class="q-mb-lg q-mt-none q-pt-none">Sign in</h1>
    <google-signin @on-signin-success="onSigninSuccess" />
    <q-separator class="q-my-lg"></q-separator>
    <credentials-signin-form
      class="q-mx-md"
      @on-signin-success="onSigninSuccess"
    />
    <q-separator class="q-my-lg"></q-separator>
    <div><small>You don't have an account yet ?</small><br /></div>
    <q-btn class="q-mt-sm" rounded outline color="info" @click="goToSignup">
      <small>Sign up</small>
    </q-btn>
  </pollit-page>
</template>
