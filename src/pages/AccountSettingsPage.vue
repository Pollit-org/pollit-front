<script setup lang="ts">
import PollitPage from 'components/PollitPage.vue';
import { useConnectedUserStore } from 'src/stores/connected-user-store';
import { ref } from 'vue';

const connectedUserStore = useConnectedUserStore();
const genderOptions = ref(['Female', 'Male', 'Other', 'Prefer not to say']);
</script>

<template>
  <pollit-page>
    <h1>Account settings</h1>
    <h2 class="q-mt-xl q-mb-xs">Account</h2>
    <q-separator></q-separator>
    <q-form class="flex align-center justify-between">
      <div class="self-end">Email</div>
      <q-input
        :model-value="connectedUserStore.user?.claims.Email"
        readonly
        style="max-width: 55%; width: 500px"
        item-aligned
        dense
        class="self-end q-px-none q-py-none"
        input-class="q-py-none self-end"
        input-style="line-height: inherit;"
      >
      </q-input>
    </q-form>
    <q-form class="flex align-center justify-between">
      <div class="self-end">Age</div>
      <q-input
        model-value="16"
        style="max-width: 55%; width: 500px"
        item-aligned
        dense
        class="self-end q-px-none q-py-none"
        input-class="q-py-none self-end"
        input-style="line-height: inherit;"
        type="number"
      />
    </q-form>
    <q-form class="flex align-center justify-between">
      <div class="self-end">Gender</div>
      <q-select
        style="max-width: 55%; width: 500px"
        model-value="Male"
        :options="genderOptions"
        dense
        class="self-end q-px-none q-py-none"
        input-class="q-py-none self-end"
        input-style="line-height: inherit; display: none;"
      />
    </q-form>
    <q-form class="flex align-center justify-center">
      <q-btn class="q-mt-lg" color="info" outline>Change password</q-btn>
    </q-form>
    <h2 class="q-mt-xl q-mb-xs">Profile</h2>
    <q-separator></q-separator>
    <q-form class="flex align-center justify-between">
      <div class="self-end">User name</div>
      <q-input
        :model-value="connectedUserStore.user?.claims.UserName"
        readonly
        style="max-width: 55%; width: 500px"
        item-aligned
        dense
        class="self-end q-px-none q-py-none"
        input-class="q-py-none self-end"
        input-style="line-height: inherit;"
      />
    </q-form>
    <q-form class="flex align-center justify-between">
      <div class="self-end">Avatar</div>
      <q-input
        model-value="toto"
        style="max-width: 55%; width: 500px"
        item-aligned
        dense
        class="self-end q-px-none q-py-none"
        input-class="q-py-none self-end"
        input-style="line-height: inherit;"
      >
      </q-input>
    </q-form>
    <h2 class="q-mt-xl q-mb-xs text-negative">Danger zone</h2>
    <q-separator color="negative"></q-separator>
    <q-form class="flex align-center justify-center">
      <q-btn class="q-mt-lg" icon="delete" color="negative" outline
        >DELETE MY ACCOUNT</q-btn
      >
    </q-form>
  </pollit-page>
</template>
