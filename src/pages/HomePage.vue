<!-- eslint-disable vue/no-setup-props-destructure -->
<script setup lang="ts">
import PollFeed from 'src/components/PollFeed.vue';
import PollitPage from 'src/components/PollitPage.vue';
import { removeTag } from 'src/misc/filterTags';

interface Props {
  search?: string;
  tags?: string;
}

const props = withDefaults(defineProps<Props>(), {});

</script>

<template>
  <pollit-page :has-back-button="false">
    <div v-if="props.tags" class="q-mt-md wrap">
      <q-chip
        v-for="tag in props.tags?.split(' ')"
        :key="tag"
        removable
        @remove="removeTag(tag)"
      >
        #{{ tag }}
      </q-chip>
    </div>
    <poll-feed :search="props.search" :tags="props.tags"></poll-feed>
  </pollit-page>
</template>
