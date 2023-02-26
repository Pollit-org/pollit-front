<script setup lang="ts">
export interface Props {
  options: { text: string; votes: number }[];
}

const props = defineProps<Props>();

const showResults = (index: number) => {
  console.log(`Option selected: ${props.options[index].text}`);
};
</script>

<template>
  <q-card-section class="poll-options">
    <q-scroll-area style="height: 100px; max-height: 180px">
      <q-list bordered separator dense>
        <q-item
          clickable
          v-for="(option, index) in props.options"
          :key="index"
          @click="showResults(index)"
        >
          <q-item-section>
            <q-item-label>{{ option.text }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-card-section>
</template>
