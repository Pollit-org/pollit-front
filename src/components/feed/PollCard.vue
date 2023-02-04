<script setup lang="ts">
const username = 'User1';
const timeSincePost = '5 hours ago';
const question = 'What is your favorite color?';
const options: { text: string; votes: number }[] = [
  { text: 'Red', votes: 20 },
  { text: 'Green', votes: 15 },
  { text: 'Blue', votes: 25 },
];
const totalVotes = 60;
const totalComments = 20;
const tags: { text: string; link: string }[] = [
  { text: 'color', link: 'color' },
  { text: 'favorite', link: 'favorite' },
  { text: 'blabla', link: 'blabla' },
  { text: 'yeslife', link: 'yeslife' },
];

const showResults = (index: number) => {
  console.log(`Option selected: ${options[index].text}`);
};
</script>

<template>
  <q-card class="poll-post q-mt-md q-mt-md bg-white">
    <q-card-section>
      <div class="row items-center">
        <div>
          <div class="text-weight-medium">{{ username }}</div>
          <span class="text-weight-light">{{ timeSincePost }}</span>
        </div>
        <q-space />
        <div class="row q-pa-md wrap desktop-only">
          <q-btn
            no-caps
            rounded
            class="q-ma-xs text-weight-bold"
            size="xs"
            style="font-size: small"
            v-for="(tag, index) in tags"
            :key="index"
            :label="'#' + tag.text"
            :to="tag.link"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-section class="text-h6 q-pt-none q-pb-none">{{ question }}</q-card-section>
    <q-card-section class="poll-options">
      <q-list bordered separator>
        <q-item
          clickable
          v-for="(option, index) in options"
          :key="index"
          @click="showResults(index)"
        >
          <q-item-section>
            <q-item-label>{{ option.text }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-actions class="row q-pa-md justify-between">
      <div class="row items-center inline">
        <q-icon name="o_poll" size="1.2rem" class="q-mr-xs" />
        <span class="poll-votes text-weight-bold">{{ totalVotes }} Votes</span>
      </div>
      <q-btn flat class="row items-center">
        <q-icon name="o_forum" size="1.2rem" class="q-mr-xs" />
        <span class="poll-comments text-weight-bold">{{ totalComments }} Comments</span>
      </q-btn>
      <q-btn round flat class="poll-share" icon="share" size="sm" />
    </q-card-actions>
  </q-card>
</template>
