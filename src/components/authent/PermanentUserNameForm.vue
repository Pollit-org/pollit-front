<script setup lang="ts">
import { useConnectedUserStore } from 'stores/connected-user-store';
import { ref } from 'vue';

const connectedUserStore = useConnectedUserStore();

let userName = ref('');

const setPermanentUserName = async () => {
  await connectedUserStore.setPermanentUserName(userName.value);
};
</script>

<template>
  <q-form @submit="setPermanentUserName" v-model="valid">
    <q-input
      filled
      color="light"
      v-model="userName"
      :readonly="loading"
      :rules="[required]"
      class="q-mb-xs"
      clearable
      label="User name"
    >
    </q-input>
    <q-btn
      type="submit"
      class="q-px-lg"
      color="positive"
      text-color="dark"
      rounded
      outlined
    >
      Set user name
    </q-btn>
  </q-form>
</template>
