<template>
  <q-page class="flex justify-center">
    <div
      :class="verticalCenter ? 'self-center' : ''"
      :style="'width: 80%; max-width:' + maxWidth"
    >
      <slot></slot>
    </div>
  </q-page>
</template>

<script setup lang="ts">
export interface Props {
  verticalCenter: boolean;
  maxWidth: string;
}

const props = withDefaults(defineProps<Props>(), {
  verticalCenter: false,
  maxWidth: '650px',
});
</script>
