<script setup lang="ts">
import { Poll } from 'src/api/models/poll';
import { inject } from 'vue';
import { postInjectionKey } from './injection_keys';
import { addTag } from 'src/misc/filterTags';
import { getColorFromString } from 'src/misc/stringUtils';
import { brightColors } from 'src/misc/colors';

const poll = inject(postInjectionKey) as Poll;

// Compute colors for tags
const tagColors = poll.tags.map((tag: string) => {
  const backgroundColor = getColorFromString(tag, brightColors);
  return {
    tag,
    backgroundColor: backgroundColor,
    textColor: '#fff',
  };
});
</script>

<template>
  <q-card-section>
    <q-btn
      v-for="(tag, index) in poll.tags"
      :key="tag"
      :label="tag"
      @click.stop="addTag(tag)"
      no-caps
      size="xs"
      class="q-mr-xs q-px-sm q-py-none"
      rounded
      flat
      dense
      :style="{
        'background-color': tagColors[index].backgroundColor,
        color: tagColors[index].textColor,
        'font-size': '0.7rem',
      }"
    />
  </q-card-section>
</template>
