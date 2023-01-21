<script setup lang="ts">
import {useCodeClient} from "vue3-google-signin";
import { useConnectedUserStore } from "@/stores/ConnectedUserStore";
import googleIcon from "../icons/GoogleLogo.vue";

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
  <v-btn
    :prepend-icon="googleIcon"
    variant="outlined"
    rounded="pill"
    @click="() => login()">
    Sign in with google
  </v-btn>
</template>
