<script setup lang="ts">
import {useCodeClient} from "vue3-google-signin";
import { useConnectedUserStore } from "stores/connected-user-store";
import googleIcon from "../icons/GoogleLogo.vue";
import toto from "src/assets/Google_G_Logo.svg"

const connectedUserStore = useConnectedUserStore();

const emit = defineEmits(['onSigninSuccess'])

const handleOnSuccess = async (response: any) => {
  await connectedUserStore.signinWithGoogle(response.code);
  emit('onSigninSuccess')
};

const handleOnError = (errorResponse: any) => {
  console.log("Error: ", errorResponse);
};

const { login } = useCodeClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
  scope: "email https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/user.birthday.read",  
});

</script>

<template>
  <q-btn
    rounded
    outline
    @click="() => login()">
    <q-icon name="svguse:icons/google.svg#classic" size="18px" class="q-mr-xs"></q-icon>
    Sign in with google
  </q-btn>
</template>
