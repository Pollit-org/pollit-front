<script setup lang="ts">
import PollFeed from 'src/components/PollFeed.vue';
import Router from 'src/router';
import PollitPage from 'src/components/PollitPage.vue';
import { ref } from 'vue';
import { useGlobalStore } from 'src/stores/global-store';

interface Props {
  search?: string;
  tags?: string;
}

const globalStore = useGlobalStore();

const props = withDefaults(defineProps<Props>(), {});

const searchText = ref(props.search ?? '');

const removeTag = (tag: string) => {
  var tags =
    props.tags
      ?.split(' ')
      .filter((t) => t != tag)
      .join(' ') ?? '';

  Router.push({
    name: 'Home',
    query: {
      q: searchText.value.length > 0 ? searchText.value : undefined,
      tags: tags?.length > 0 ? tags : undefined,
    },
  });
};

const submitSearch = () =>
  Router.push({
    name: 'Home',
    query: {
      q: searchText.value.length > 0 ? searchText.value : undefined,
      tags: props.tags,
    },
  });
</script>

<template>
  <pollit-page :has-back-button="false">
    <q-form @submit="submitSearch">
      <q-input
        v-model="searchText"
        label="Search"
        rounded
        outlined
        dense
        class="q-mt-md"
      >
        <template v-slot:append>
          <q-icon
            v-if="searchText !== ''"
            name="close"
            @click="searchText = ''"
            class="cursor-pointer"
          />
          <q-btn
            :disable="globalStore.isLoading"
            type="submit"
            round
            dense
            flat
            icon="send"
            @click="submitSearch"
          />
        </template>
      </q-input>
    </q-form>
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