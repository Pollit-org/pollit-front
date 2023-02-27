<script setup lang="ts">
import PollBottomBar from './PollBottomBar.vue';
import PollOptions from './PollOptions.vue';
import PollTitle from './PollTitle.vue';
import PollHeader from './PollHeader.vue';
import { Post } from 'src/models/interfaces';
import { provide } from 'vue';
import { postInjectionKey } from './injection_keys';

interface Props {
  post: Post
}
const props = defineProps<Props>();
provide(postInjectionKey, props.post);
</script>

<template>
  <q-card class="poll-post q-mt-md q-mt-md bg-white">
    <poll-header />
    <poll-title />
    <poll-options />
    <poll-bottom-bar style="z-index: -1;" />
  </q-card>
</template>
