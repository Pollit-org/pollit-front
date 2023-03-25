<script setup lang="ts">
import { User, Comment } from 'src/models/interfaces';
import { computed } from 'vue';

interface Props {
  comment: Comment;
  opUser: User;
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
    :label="props.comment.user.username"
    :caption="props.comment.timeSincePost"
    :style="comment_syle"
    class="q-pb-sm"
  >
    <q-card class="comment-tree-marker">
      <q-card-section class="q-pa-none q-pl-md q-pr-md q-pt-sm">
        {{ props.comment.commentText }}
      </q-card-section >
      <q-card-section v-if="props.comment.replies.length > 0" class="q-pa-none q-pl-md q-pr-md q-pt-sm">
        <recursive-comment
          :spacing="spacing + 10"
          v-for="(childComment, index) in props.comment.replies"
          :key="index"
          :comment="childComment"
          :op-user="props.opUser"
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