<script setup lang="ts">
export interface Props {
  title: string;
}
const props = defineProps<Props>();
</script>

<template>
  <q-card-section class="text-h6 q-pt-none q-pb-none">{{ props.title }}</q-card-section>
</template>
