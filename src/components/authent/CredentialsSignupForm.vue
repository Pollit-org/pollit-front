<script setup lang="ts">
import { useConnectedUserStore } from 'stores/connected-user-store';
import { ref } from 'vue';
import { requiredField } from 'src/misc/validationRules';

const connectedUserStore = useConnectedUserStore();

let email = ref('');
let userName = ref('');
let password = ref('');

let formIsValid = ref(true);

const emit = defineEmits(['onSignupSuccess']);

const signupWithCredentials = () => {
  connectedUserStore.signupWithCredentials(
    email.value,
    userName.value,
    password.value
  );
  emit('onSignupSuccess');
};
</script>

<template>
  <q-form ref="form" v-model="valid">
    <q-input
      filled
      color="light"
      v-model="email"
      :readonly="loading"
      :rules="[requiredField]"
      class="q-mb-xs"
      clearable
      label="Email"
      type="email"
    >
    </q-input>
    <q-input
      filled
      color="light"
      v-model="userName"
      :readonly="loading"
      :rules="[requiredField]"
      class="q-mb-xs"
      clearable
      label="Username"
    >
    </q-input>
    <q-input
      filled
      color="light"
      v-model="password"
      :readonly="loading"
      :rules="[required]"
      class="q-mb-xs"
      clearable
      label="Password"
      type="password"
    >
    </q-input>
    <q-btn
      type="submit"
      class="q-px-xl"
      color="positive"
      text-color="dark"
      rounded
      outlined
      @click="signupWithCredentials"
    >
      Sign up
    </q-btn>
  </q-form>
</template>
