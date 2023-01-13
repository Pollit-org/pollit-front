<script setup lang="ts">
import {useCodeClient} from "vue3-google-signin";
import googleIcon from "../icons/GoogleLogo.vue";
import { axiosPollit } from "@/axios";

const handleOnSuccess = async (response: any) => {
  console.log("Code: ", response.code);
  console.log("Whole response: ", JSON.stringify(response));

  const result = await axiosPollit.post("auth/signin/google", { code: response.code });

  console.log(result);
};

const handleOnError = (errorResponse: any) => {
  console.log("Error: ", errorResponse);
};

const { isReady, login } = useCodeClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
  scope: "email https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/user.birthday.read",  
  // other options
});


</script>

<template>
  <v-container class="fill-height">
    <v-responsive max-width="344" class="d-flex align-center text-center fill-height mx-auto">
        <h1 class="my-8">Login</h1>
        <v-btn 
            class="my-5"
            :prepend-icon="googleIcon"
            variant="outlined"
            rounded="pill"
            @click="() => login()">
            Login with google
        </v-btn>

        <v-divider class="my-5"></v-divider>
        <v-form
            class="px-5"
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-text-field
                variant="solo"
                v-model="email"
                :readonly="loading"
                :rules="[required]"
                class="mb-1 rounded-text-input"
                clearable
                label="Email or Username"
                >
            </v-text-field>
            <v-text-field
                variant="solo"
                v-model="password"
                :readonly="loading"
                :rules="[required]"
                class="mb-1 rounded-text-input"
                clearable
                label="Password"
            >
        </v-text-field>
            <v-btn
                class="px-10"
                color="success"
                rounded="pill"
                @click="validate"
            >
                Login
            </v-btn>
        </v-form>
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
