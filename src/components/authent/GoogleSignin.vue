<script setup lang="ts">
import {
  type CredentialResponse,
  useOneTap,
  AuthCodeFlowSuccessResponse,
  AuthCodeFlowErrorResponse,
  useTokenClient,
  useCodeClient,
  ImplicitFlowErrorResponse,
  ImplicitFlowSuccessResponse,
} from 'vue3-google-signin';
import { useConnectedUserStore } from 'stores/connected-user-store';

const connectedUserStore = useConnectedUserStore();

const emit = defineEmits(['onSigninSuccess']);

// todo maybe later ? one tap signin
// useOneTap({
//   onSuccess: (response: CredentialResponse) => {
//     console.log('Success:', response);
//   },
//   onError: () => console.error('Error with One Tap Login'),
//   autoSelect: false,
//   // options
// });

const handleOnSuccess = async (response: AuthCodeFlowSuccessResponse) => {
  await connectedUserStore.signinWithGoogleAccessToken(response.access_token);
  console.log('Access Token: ', response.access_token);
};

const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
  console.log('Error: ', errorResponse);
};

const { isReady, login } = useTokenClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
  // other options
});

interface Props {
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Sign in with Google',
});
</script>

<template>
  <q-btn :disable="!isReady" rounded outline @click="() => login()">
    <q-icon
      name="svguse:icons/google.svg#classic"
      size="18px"
      class="q-mr-xs"
    ></q-icon>
    {{ props.label }}
  </q-btn>
</template>
