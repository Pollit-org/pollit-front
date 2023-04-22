<template>
  <pollit-page
    vertical-center
    class="text-center"
    max-width="340px"
    :show-spinner-on-load="false"
    :has-back-button="$props.hasBackButton"
  >
    <p-spinner></p-spinner>
  </pollit-page>
</template>

<script setup lang="ts">
import PollitPage from 'components/PollitPage.vue';
import PSpinner from 'components/PSpinner.vue';

export interface Props {
  hasBackButton: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hasBackButton: false,
});
</script>
