<script setup lang="ts">
import GoogleSignin from 'components/authent/GoogleSignin.vue'
import CredentialsSigninForm from 'components/authent/CredentialsSigninForm.vue'
</script>

<template>
  <q-page class="flex justify-center text-center q-mx-none q-px-none">
    <div class="self-center" style="width: 80%; max-width: 344px;">
        <h1 class="q-mb-lg q-mt-none q-pt-none">Signin</h1>
        <google-signin @on-signin-success="onSigninSuccess"/>
        <q-separator class="q-my-lg"></q-separator>
        <credentials-signin-form class="q-mx-md" @on-signin-success="onSigninSuccess"/>
        <q-separator class="q-my-lg"></q-separator>
        <div><small>You don't have an account yet ?</small><br></div>
        <q-btn
            class="q-mt-sm"
            rounded
            outline
            color="info"
            @click="signup"
        >
            <small>Signup</small>
        </q-btn>
    </div>
  </q-page>
</template>
