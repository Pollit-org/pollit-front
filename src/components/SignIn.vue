<script setup lang="ts">
import GoogleSignin from 'components/authent/GoogleSignin.vue';
import CredentialsSigninForm from 'components/authent/CredentialsSigninForm.vue';
import Router from 'src/router';

const goToSignup = () => Router.push({ name: 'Signup' });
</script>

<template>
  <q-card flat align="center">
    <q-card-section>
      <h1 class="q-mb-lg q-mt-none q-pt-none">Sign in</h1>
    </q-card-section>
    <q-card-section>
      <google-signin />
    </q-card-section>
    <q-card-section>
      <credentials-signin-form class="q-mx-md" />
    </q-card-section>
    <q-card-section>
      <div><small>You don't have an account yet ?</small><br /></div>
      <q-btn class="q-mt-sm" rounded outline color="info" @click="goToSignup">
        <small>Sign up</small>
      </q-btn></q-card-section
    >
  </q-card>
</template>
