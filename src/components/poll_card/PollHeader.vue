<script setup lang="ts">
export interface Props {
  username: string;
  timeSincePost: string;
  tags: { text: string; link: string }[];
}

const props = defineProps<Props>();
</script>

<template>
  <q-card-section class="q-pt-none q-pb-none">
    <div class="row items-center">
      <div>
        <div class="text-weight-medium">
          {{ props.username }}
        </div>
        <span class="text-weight-light">{{ props.timeSincePost }}</span>
      </div>
      <q-space />
      <div class="row q-pa-md wrap desktop-only">
        <q-btn
          no-caps
          rounded
          class="q-ma-xs text-weight-bold"
          size="xs"
          style="font-size: 0.7rem"
          v-for="(tag, index) in props.tags"
          :key="index"
          :label="'#' + tag.text"
          :to="tag.link"
        />
      </div>
    </div>
  </q-card-section>
</template>
