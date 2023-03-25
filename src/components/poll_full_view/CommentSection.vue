<script setup lang="ts">
import { Post } from 'src/models/interfaces';
import RecursiveComment from './RecursiveComment.vue';

interface Props {
  post: Post;
}
const props = defineProps<Props>();
</script>
<template>
  <q-card>
    <q-card-section>
      <recursive-comment
        v-for="(comment, index) in props.post.comments"
        :key="index"
        :comment="comment"
        :op-user="post.user"
      />
    </q-card-section>
  </q-card>
</template>
