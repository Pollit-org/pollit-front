<script setup lang="ts">
import {ImplicitFlowErrorResponse, ImplicitFlowSuccessResponse, useCodeClient} from 'vue3-google-signin';
import { useConnectedUserStore } from 'stores/connected-user-store';

const connectedUserStore = useConnectedUserStore();

const emit = defineEmits(['onSigninSuccess'])

const handleOnSuccess = async (response: ImplicitFlowSuccessResponse) => {
  await connectedUserStore.signinWithGoogle(response.code);
  emit('onSigninSuccess')
};

const handleOnError = (errorResponse: ImplicitFlowErrorResponse) => {
  console.log('Error: ', errorResponse);
};

const { login } = useCodeClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
  scope: 'email https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/user.birthday.read',  
});

interface Props {
  label?: string
}

const props = withDefaults(defineProps<Props>(), {label: 'Sign in with Google'})


</script>

<template>
  <q-btn
    rounded
    outline
    @click="() => login()">
    <q-icon name="svguse:icons/google.svg#classic" size="18px" class="q-mr-xs"></q-icon>
    {{ props.label }}
  </q-btn>
</template>
