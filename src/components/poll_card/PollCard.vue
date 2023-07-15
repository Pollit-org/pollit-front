<script setup lang="ts">
import PollBottomBar from './PollBottomBar.vue';
import PollOptions from './PollOptions.vue';
import PollTitle from './PollTitle.vue';
import PollHeader from './PollHeader.vue';
import { provide } from 'vue';
import { postInjectionKey } from './injection_keys';
import { Poll } from 'src/api/models/poll';

interface Props {
  poll: Poll;
}
const props = defineProps<Props>();
provide(postInjectionKey, props.poll);
</script>

<template>
  <q-card class="q-mt-md q-mt-md bg-white">
    <poll-header />
    <poll-title />
    <poll-options />
    <poll-bottom-bar style="z-index: -1" />
  </q-card>
</template>
