<script setup lang="ts">
import {
  AuthCodeFlowSuccessResponse,
  AuthCodeFlowErrorResponse,
  useTokenClient,
} from 'vue3-google-signin';
import { useConnectedUserStore } from 'stores/connected-user-store';

const connectedUserStore = useConnectedUserStore();

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
  label: 'Google',
});
</script>

<template>
  <q-btn :disable="!isReady" rounded outline @click="() => login()">
    <svg width="18px" height="18px" class="q-mr-xs">
      <use xlink:href="/icons/google.svg#classic"></use>
    </svg>
    {{ props.label }}
  </q-btn>
</template>
