<script setup lang="ts">
import RecursiveComment from './RecursiveComment.vue';
import { Comment } from 'src/api/models/comment';

interface Props {
  comments: Comment[];
}
const props = defineProps<Props>();
</script>
<template>
  <q-card>
    <q-card-section>
      <recursive-comment
        v-for="(comment, index) in props.comments"
        :key="index"
        :comment="comment"
        :author="comment.author"
      />
    </q-card-section>
  </q-card>
</template>
