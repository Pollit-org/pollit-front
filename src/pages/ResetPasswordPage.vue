<script setup lang="ts">
import ResetPasswordForm from 'src/components/authent/ResetPasswordForm.vue';
import PollitPage from 'src/components/PollitPage.vue';
import { useConnectedUserStore } from 'src/stores/connected-user-store';
import { onBeforeMount, ref } from 'vue';
import BackHomeButton from 'components/BackHomeButton.vue';

interface Props {
  userId: string;
  resetPasswordToken: string;
}

const props = defineProps<Props>();

const connectedUserStore = useConnectedUserStore();

const canResetPassword = ref<boolean | null>(true);
onBeforeMount(async () => {
  await connectedUserStore.signout(true);
  canResetPassword.value = await connectedUserStore.canResetPassword(
    props.userId,
    props.resetPasswordToken
  );
});

const successFullyresetPassword = ref(false);

const onResetPasswordSuccess = (toto: string) => {
  console.log('received');

  successFullyresetPassword.value = true;
};
</script>

<template>
  <pollit-page
    vertical-center
    :has-back-button="false"
    text-center
  >
    <template v-if="successFullyresetPassword">
      <h2>Your password was reset successfully.</h2>
      <br />
      <back-home-button />
    </template>
    <template v-else-if="canResetPassword">
      <h1 class="q-mb-lg q-mt-none q-pt-none">Reset your password</h1>
      <reset-password-form
        :userId="props.userId"
        :resetPasswordToken="props.resetPasswordToken"
        @resetPasswordSuccess="onResetPasswordSuccess"
      />
    </template>
    <template v-else>
      <h2>Invalid reset password link. It may be that the link has expired.</h2>
      <br />
      <back-home-button />
    </template>
  </pollit-page>
</template>
