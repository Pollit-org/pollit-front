<template>
  <q-page class="column items-center bg-blue-grey-1">
    <div
      :class="
        (props.verticalCenter || showSpinner ? 'self-center ' : '') +
        (props.textCenter ? 'text-center ' : '')
      "
      :style="'width: 95%; max-width:' + props.maxWidth"
    >
      <q-btn
        icon="arrow_back"
        v-if="hasBackButton"
        @click="goBack"
        class="q-my-sm bg-white"
        size="sm"
      />
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
import PSpinner from 'components/PSpinner.vue';
import ErrorNotFound from 'src/pages/ErrorNotFound.vue';
import { computed } from 'vue';

export interface Props {
  verticalCenter: boolean;
  maxWidth: string;
  showSpinnerOnLoad: boolean;
  is404: boolean;
  hasBackButton: boolean;
  backButtonFallbackRoute: string | undefined;
  textCenter: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  verticalCenter: false,
  maxWidth: '700px',
  showSpinnerOnLoad: true,
  is404: false,
  hasBackButton: true,
  backButtonFallbackRoute: undefined,
  textCenter: false,
});

const globalStore = useGlobalStore();

const showSpinner = computed(
  () => props.showSpinnerOnLoad && globalStore.isLoadingGlobal
);

const goBack = () => {
  globalStore.navigateBackOrDefault(props.backButtonFallbackRoute);
};
</script>
