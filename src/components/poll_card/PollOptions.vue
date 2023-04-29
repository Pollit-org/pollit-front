<script setup lang="ts">
import { inject } from 'vue';
import { postInjectionKey } from './injection_keys';
import { Poll } from 'src/api/models/poll';

const poll = inject(postInjectionKey) as Poll;

const showResults = (index: number) => {
  console.log(`Option selected: ${poll.options[index].title}`);
};
</script>

<template>
  <q-card-section class="poll-options">
    <q-scroll-area style="height: 100px; max-height: 180px">
      <q-list bordered separator dense>
        <q-item
          clickable
          v-for="(option, index) in poll.options"
          :key="index"
          @click="showResults(index)"
        >
          <q-item-section>
            <q-item-label>{{ option.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-card-section>
</template>
