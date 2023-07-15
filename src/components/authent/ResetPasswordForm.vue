<script setup lang="ts">
import { useConnectedUserStore } from 'stores/connected-user-store';
import { computed, ref, defineEmits } from 'vue';
import { requiredField } from 'src/misc/validationRules';
import { useGlobalStore } from 'src/stores/global-store';
import { useI18n } from 'vue-i18n';

interface Props {
  userId: string;
  resetPasswordToken: string;
}

const globalStore = useGlobalStore();
const connectedUserStore = useConnectedUserStore();

const newPassword = ref('');
const confirmNewPassword = ref('');

const props = defineProps<Props>();

const passwordsMatch = computed(
  () => newPassword.value === confirmNewPassword.value
);

const isFormValid = computed(
  () => newPassword.value.length > 0 && passwordsMatch.value
);

const t = useI18n().t;

const ruleConfirmPasswordMustmatchPassword = () => passwordsMatch.value ? true : t('auth.resetPassword.passwordsMismatchErrorLabel');

const emit = defineEmits(['resetPasswordSuccess']);

const resetPassword = () => {
  connectedUserStore.resetPassword(
    props.userId,
    props.resetPasswordToken,
    newPassword.value
  ).then(() => {
    console.log('bout to emit');

    emit('resetPasswordSuccess', 'null');

    console.log('emitted');
  });
};
</script>

<template>
  <q-form @submit="resetPassword" ref="form" v-model="isFormValid">
    <q-input
      filled
      color="light"
      v-model="newPassword"
      :readonly="globalStore.isLoading"
      :rules="[requiredField]"
      class="q-mb-xs"
      clearable
      :label=" $t('auth.resetPassword.newPasswordInputLabel')"
      type="password"
    >
    </q-input>
    <q-input
      filled
      color="light"
      v-model="confirmNewPassword"
      :readonly="globalStore.isLoading"
      :rules="[requiredField, ruleConfirmPasswordMustmatchPassword]"
      class="q-mb-xs"
      clearable
      :label=" $t('auth.resetPassword.confirmNewPasswordInputLabel')"
      type="password"
    >
    </q-input>
    <q-btn
      :disable="!isFormValid"
      type="submit"
      class="q-px-xl"
      color="positive"
      text-color="dark"
      rounded
      outlined
    >
      {{ $t('auth.resetPassword.cta') }}
    </q-btn>
  </q-form>
</template>
