<script setup lang="ts">
import GoogleSignin from 'components/authent/GoogleSignin.vue'
import CredentialsSignupForm from 'src/components/authent/CredentialsSignupForm.vue';
import Router from 'src/router';

const goToSignin = () => Router.push({ name: 'Signin'});
</script>

<template>
  <q-page class="flex justify-center text-center q-mx-none q-px-none">
    <div class="self-center" style="width: 80%; max-width: 344px;">
        <h1 class="q-mb-lg q-mt-none q-pt-none">Sign up</h1>
        <google-signin label="Sign up with Google"/>
        <q-separator class="q-my-lg"></q-separator>
        <credentials-signup-form class="q-mx-md"/>
        <q-separator class="q-my-lg"></q-separator>
        <div><small>You have an account already ?</small><br></div>
        <q-btn
            class="q-mt-sm"
            rounded
            outline
            color="info"
            @click="goToSignin"
        >
            <small>Sign in</small>
        </q-btn>
    </div>
  </q-page>
</template>
