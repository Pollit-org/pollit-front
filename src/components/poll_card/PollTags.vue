<script setup lang="ts">
import { Poll } from 'src/api/models/poll';
import { inject } from 'vue';
import { postInjectionKey } from './injection_keys';
import { addTag } from 'src/misc/filterTags';

const poll = inject(postInjectionKey) as Poll;

// Function to generate random pastel colors
function getRandomPastelColor() {
  const excludedHRanges = [
    [45, 130],
    [170, 180],
  ];
  const availableHues = [];

  // Populate available hues array
  for (let hue = 0; hue < 360; hue++) {
    if (!excludedHRanges.some(([start, end]) => hue >= start && hue <= end)) {
      availableHues.push(hue);
    }
  }

  const randomIndex = Math.floor(Math.random() * availableHues.length);
  const selectedHue = availableHues[randomIndex];

  return `hsl(${selectedHue}, 100%, 40%)`;
}
</script>

<template>
  <q-card-section>
      <q-btn
        v-for="tag in poll.tags"
        :key="tag"
        :label="'#' + tag"
        @click.stop="addTag(tag)"
        dense
        flat
        no-wrap
        no-caps
        size="xs"
        class="underline-hover q-mr-xs no-padding"
        :style="{ 'font-size': '0.75rem', 'color': getRandomPastelColor() }"
      />
  </q-card-section>
</template>
