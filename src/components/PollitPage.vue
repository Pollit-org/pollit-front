<template>
  <q-btn
    icon="arrow_back"
    class="q-mt-md q-ml-xl"
    v-if="hasBackButton"
    @click="goBack"
  />
  <q-page class="flex justify-center">
    <div
      :class="props.verticalCenter || showSpinner ? 'self-center' : ''"
      :style="'width: 80%; max-width:' + props.maxWidth"
    >
      <error-not-found v-if="is404"></error-not-found>
      <div v-else-if="showSpinner" class="flex justify-center self-center">
        <p-spinner class="self-center"></p-spinner>
      </div>
      <slot v-else></slot>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useGlobalStore } from 'src/stores/global-store';
import PSpinnerPage from 'components/PSpinnerPage.vue';
import PSpinner from 'components/PSpinner.vue';
import ErrorNotFound from 'src/pages/ErrorNotFound.vue';
import Router from 'src/router';
import { computed } from 'vue';

export interface Props {
  verticalCenter: boolean;
  maxWidth: string;
  showSpinnerOnLoad: boolean;
  is404: boolean;
  hasBackButton: boolean;
  backButtonFallbackRoute: string;
}

const props = withDefaults(defineProps<Props>(), {
  verticalCenter: false,
  maxWidth: '650px',
  showSpinnerOnLoad: true,
  is404: false,
  hasBackButton: true,
  backButtonFallbackRoute: 'Home',
});

const globalStore = useGlobalStore();

const showSpinner = computed(
  () => props.showSpinnerOnLoad && globalStore.isLoading
);

const goBack = () => {
  if (window.history.length > 2) Router.go(-1);
  else Router.push({ name: props.backButtonFallbackRoute });
};
</script>
