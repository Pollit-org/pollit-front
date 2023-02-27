<script setup lang="ts">
import { ref } from 'vue';
import RecursiveComment from './RecursiveComment.vue';

interface Props {
  comments : 
}
</script>
<template>
  <q-card>
    <q-card-section>
      <recursive-comment v-for="(comment, index) in comments" :key="index" :username="comment.username" :date="comment.date" :comment="comment.comme
      " :child-comments="comment.childComments" />
    </q-card-section>
  </q-card>
</template>
