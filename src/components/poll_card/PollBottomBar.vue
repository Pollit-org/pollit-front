<script setup lang="ts">
export interface Props {
  totalVotes: number;
  totalComments: number;
}

const props = defineProps<Props>();
</script>

<template>
  <q-card-actions class="row justify-between q-pb-xs">
    <div class="row items-center inline">
      <q-icon name="o_poll" size="1.2rem" class="q-mr-xs" />
      <span class="poll-votes text-weight-bold" style="font-size: 0.8rem">{{
        props.totalVotes
      }}</span>
    </div>
    <q-btn flat class="row items-center">
      <q-icon name="o_forum" size="1rem" class="q-mr-xs" />
      <span class="poll-comments" style="font-size: 0.7rem"
        >{{ props.totalComments }} Comments</span
      >
    </q-btn>
    <q-btn round flat class="poll-share" icon="share" size="sm" />
  </q-card-actions>
</template>
