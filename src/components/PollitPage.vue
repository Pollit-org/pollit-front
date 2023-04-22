<template>
  <p-spinner-page
    v-if="showSpinnerOnLoad && globalStore.isLoading"
    :has-back-button="props.hasBackButton"
  ></p-spinner-page>
  <q-page v-else class="flex justify-center">
    <div
      :class="props.verticalCenter ? 'self-center' : ''"
      :style="'width: 80%; max-width:' + props.maxWidth"
    >
      <q-btn
        icon="arrow_back"
        class="q-mt-md"
        v-if="hasBackButton"
        @click="goBack"
      />
      <error-not-found v-if="is404"></error-not-found>
      <slot v-else></slot>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useGlobalStore } from 'src/stores/global-store';
import PSpinnerPage from 'components/PSpinnerPage.vue';
import ErrorNotFound from 'src/pages/ErrorNotFound.vue';
import Router from 'src/router';

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

const goBack = () => {
  if (window.history.length > 2) Router.go(-1);
  else Router.push({ name: props.backButtonFallbackRoute });
};
</script>
