<template>
  <p-spinner-page v-if="showSpinnerOnLoad && globalStore.isLoading"></p-spinner-page>
  <q-page v-else class="flex justify-center">
    <div
      :class="props.verticalCenter ? 'self-center' : ''"
      :style="'width: 80%; max-width:' + props.maxWidth"
    >
      <slot></slot>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useGlobalStore } from 'src/stores/global-store';
import PSpinnerPage from 'components/PSpinnerPage.vue';


export interface Props {
  verticalCenter: boolean;
  maxWidth: string;
  showSpinnerOnLoad: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  verticalCenter: false,
  maxWidth: '650px',
  showSpinnerOnLoad: true,
});

const globalStore = useGlobalStore();
</script>
