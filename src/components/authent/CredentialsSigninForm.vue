<script setup lang="ts">
import { useConnectedUserStore } from 'stores/connected-user-store';
import { ref } from 'vue';
import { requiredField } from 'src/misc/validationRules';
import { useGlobalStore } from 'src/stores/global-store';

const connectedUserStore = useConnectedUserStore();
const globalStore = useGlobalStore();

let emailOrUserName = ref('');
let password = ref('');

let formIsValid = ref(true);

const emit = defineEmits(['onSigninSuccess']);

const signinWithCredentials = () => {
  connectedUserStore.signinWithCredentials(
    emailOrUserName.value,
    password.value
  );
  emit('onSigninSuccess');
};
</script>

<template>
  <q-form @submit="signinWithCredentials" ref="form">
    <q-input
      filled
      color="light"
      v-model="emailOrUserName"
      :readonly="globalStore.isLoading"
      :rules="[requiredField]"
      class="q-mb-xs"
      clearable
      label="Email or Username"
      type="email"
    >
    </q-input>
    <q-input
      filled
      color="light"
      v-model="password"
      :readonly="globalStore.isLoading"
      :rules="[requiredField]"
      class="q-mb-xs"
      clearable
      label="Password"
      type="password"
    >
    </q-input>
    <q-btn
      :disable="!formIsValid"
      type="submit"
      class="q-px-xl"
      color="positive"
      text-color="dark"
      rounded
      outlined
    >
      {{ $t('auth.signin.cta') }}
    </q-btn>
  </q-form>
</template>
