<script setup lang="ts">
import { Post } from 'src/models/interfaces';
import { inject } from 'vue';
import { postInjectionKey } from './injection_keys';

const post = inject(postInjectionKey) as Post

</script>

<template>
  <q-card-section class="text-h6 q-pt-none q-pb-none">{{ post.title }}</q-card-section>
</template>
