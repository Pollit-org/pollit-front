<script setup lang="ts">
//import { Post } from 'src/models/interfaces';
import { Poll } from 'src/api/models/poll';
import { inject } from 'vue';
import { postInjectionKey } from './injection_keys';
import moment from 'moment';

const poll = inject(postInjectionKey) as Poll;
</script>

<template>
  <q-card-section>
    <div class="row items-center">
      <div>
        <div class="text-weight-medium">
          {{ poll.author }}
        </div>
        <span class="text-weight-light">{{
          moment(poll.createdAt).fromNow()
        }}</span>
      </div>
      <q-space />
      <div class="row q-pa-md wrap desktop-only">
        <q-btn
          v-for="tag in poll.tags"
          :key="tag"
          :label="'#' + tag"
          :to="'/?tags=' + tag"
          no-caps
          rounded
          class="q-ma-xs text-weight-bold"
          size="xs"
          style="font-size: 0.7rem"
        />
      </div>
    </div>
  </q-card-section>
</template>
