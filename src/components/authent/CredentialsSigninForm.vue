<script setup lang="ts">
import { useConnectedUserStore } from 'stores/connected-user-store';
import { ref } from 'vue';
import { requiredField } from 'src/misc/validationRules';

const connectedUserStore = useConnectedUserStore();

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
  <q-form ref="form" v-model="valid">
    <q-input
      filled
      color="light"
      v-model="emailOrUserName"
      :readonly="loading"
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
      :readonly="loading"
      :rules="[required]"
      class="q-mb-xs"
      clearable
      label="Password"
      type="password"
    >
    </q-input>
    <q-btn
      class="q-px-xl"
      color="positive"
      text-color="dark"
      rounded
      outlined
      @click="signinWithCredentials"
    >
      {{ $t('auth.signin.cta') }}
    </q-btn>
  </q-form>
</template>
