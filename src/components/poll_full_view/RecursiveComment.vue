<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  username: string;
  date: string;
  comment: string;
  childComments: Props[];
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
    expand-separator
    default-opened
    icon="perm_identity"
    :label="props.username"
    :caption="props.date"
    :style="comment_syle"
  >
    <q-card>
      <q-card-section>
        {{ props.comment }}
      </q-card-section>
      <q-card-section :v-if="props.childComments.length > 0">
        <recursive-comment
          :spacing="spacing + 10"
          v-for="(childComment, index) in props.childComments"
          :key="index"
          :username="childComment.username"
          :date="childComment.date"
          :comment="childComment.comment"
          :child-comments="childComment.childComments"
        />
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>
