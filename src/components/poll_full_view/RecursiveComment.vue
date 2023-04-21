<script setup lang="ts">
import moment from 'moment';
import { Comment } from 'src/api/models/comment';
import { computed } from 'vue';

interface Props {
  comment: Comment;
}
const props = defineProps<Props>();
const spacing = 0;
const comment_syle = computed(() => {
  return {
    'margin-left': `${spacing}px`,
  };
});
</script>

<template>
  <q-expansion-item
    dense
    dense-toggle
    default-opened
    icon="perm_identity"
    :label="props.comment.author"
    :caption="moment(props.comment.createdAt).fromNow()"
    :style="comment_syle"
    class="q-pb-sm"
  >
    <q-card class="comment-tree-marker">
      <q-card-section class="q-pa-none q-pl-md q-pr-md q-pt-sm">
        {{ props.comment.body }}
      </q-card-section>
      <q-card-section
        v-if="props.comment.children.length > 0"
        class="q-pa-none q-pl-md q-pr-md q-pt-sm"
      >
        <recursive-comment
          :spacing="spacing + 10"
          v-for="(childComment, index) in props.comment.children"
          :key="index"
          :comment="childComment"
        />
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<style>
.comment-tree-marker {
  border-left: 0.15rem solid rgb(220, 220, 220);
}
</style>