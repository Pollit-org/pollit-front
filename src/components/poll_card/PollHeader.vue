<script setup lang="ts">
import { Post } from 'src/models/interfaces';
import { inject } from 'vue';
import { postInjectionKey } from './injection_keys';

const post = inject(postInjectionKey) as Post
</script>

<template>
  <q-card-section>
    <div class="row items-center">
      <div>
        <div class="text-weight-medium">
          {{ post.user.username }}
        </div>
        <span class="text-weight-light">{{ post.timeSincePost }}</span>
      </div>
      <q-space />
      <div class="row q-pa-md wrap desktop-only">
        <q-btn
          no-caps
          rounded
          class="q-ma-xs text-weight-bold"
          size="xs"
          style="font-size: 0.7rem"
          v-for="(tag, index) in post.tags"
          :key="index"
          :label="'#' + tag.name"
          :to="tag.link"
        />
      </div>
    </div>
  </q-card-section>
</template>
