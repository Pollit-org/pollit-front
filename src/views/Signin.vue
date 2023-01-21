<script setup lang="ts">
import { useConnectedUserStore } from "@/stores/ConnectedUserStore";
import GoogleSignin from '../components/authent/GoogleSignin.vue'
import CredentialsSigninForm from '../components/authent/CredentialsSigninForm.vue'
</script>

<template>
  <v-container class="fill-height">
    <v-responsive max-width="344" class="d-flex align-center text-center fill-height mx-auto">
        <h1 class="my-5">Signin</h1>
        <google-signin @on-signin-success="onSigninSuccess"/>

        <v-divider class="my-5"></v-divider>
        <credentials-signin-form class="px-5" @on-signin-success="onSigninSuccess"/>
        <v-divider class="my-5"></v-divider>
        <small>You don't have an account yet ?</small><br>
        <v-btn
            class="mt-2"
            rounded="pill"
            variant="outlined"
            color="info"
            @click="signup"
        >
            <small>Signup</small>
        </v-btn>
    </v-responsive>
  </v-container>
</template>
