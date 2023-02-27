<script setup lang="ts">

import { Post } from 'src/models/interfaces';
import { inject } from 'vue';
import { postInjectionKey } from './injection_keys';

const post = inject(postInjectionKey) as Post

const showResults = (index: number) => {
  console.log(`Option selected: ${post.votingOptions[index].name}`);
};
</script>

<template>
  <q-card-section class="poll-options">
    <q-scroll-area style="height: 100px; max-height: 180px">
      <q-list bordered separator dense>
        <q-item
          clickable
          v-for="(option, index) in post.votingOptions"
          :key="index"
          @click="showResults(index)"
        >
          <q-item-section>
            <q-item-label>{{ option.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-card-section>
</template>
