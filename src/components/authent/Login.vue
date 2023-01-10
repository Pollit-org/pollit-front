<script setup lang="ts">
const gogleSigninCallback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Handle the response", response)
}
</script>

<template>
  <v-container class="fill-height">
    <v-responsive max-width="344" class="d-flex align-center text-center fill-height mx-auto">
        <h1 class="my-8">Login</h1>
        <!-- <v-btn 
            class="my-5"
            prepend-icon="mdi-cloud-upload"
            variant="outlined"
            rounded="pill">
            Login with google
        </v-btn> -->
        <GoogleLogin :callback="gogleSigninCallback"/>
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
