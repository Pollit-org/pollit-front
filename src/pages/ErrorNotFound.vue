<template>
  <div class="text-center">
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">
        Oops.<br />
        Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        @click="globalStore.navigateBackOrDefault()"
        label="Go back"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from 'src/stores/global-store';

const globalStore = useGlobalStore();
</script>
