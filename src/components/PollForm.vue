<template>
  <q-form
    @submit="submitForm"
    ref="pollForm"
    @click="
      showSigninPopupIfNotConnected(() => {
        showPollFormContent = true;
      })
    "
  >
    <q-card bordered>
      <q-input
        dense
        autogrow
        class="q-pt-md q-pl-md"
        v-model="question"
        label="Just poll it..."
        :rules="[
          (val) => /\S/.test(val) || 'Question is required',
          (val) => val.length <= 125 || '125 characters max',
        ]"
      />
      <q-card-section class="q-pb-xs" v-if="showPollFormContent">
        <q-list bordered dense>
          <q-item v-for="(option, index) in pollOptions" :key="index" dense>
            <q-item-section dense>
              <q-input
                size="xs"
                class="q-pb-sm"
                v-model="pollOptions[index]"
                :placeholder="'option ' + (index + 1)"
                :rules="[
                  (val) => /\S/.test(val) || 'Option can\'t be blank',
                  () =>
                    pollOptions.length == new Set(pollOptions).size ||
                    'Options must all be different',
                  (val) => val.length <= 20 || '20 characters max',
                ]"
                :disable="index === pollOptions.length - 1"
                dense
              />
              <q-tooltip v-if="index === pollOptions.length - 1"
                >"{{ defaultOptionText }}" default option can't be removed.</q-tooltip
              >
            </q-item-section>
            <q-item-section
              side
              v-if="index !== pollOptions.length - 1 && pollOptions.length > 3"
            >
              <q-btn dense flat icon="close" @click="removeOption(index)" />
            </q-item-section>
          </q-item>
          <q-btn
            v-if="pollOptions.length <= 10"
            dense
            size="xs"
            color="primary"
            class="q-ma-sm"
            icon="add"
            @click="addOption"
          />
        </q-list>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-none" v-if="showPollFormContent">
        <q-select
          v-model="selectedTags"
          :options="filteredTags"
          label="Tags..."
          use-chips
          dense
          filled
          squared
          multiple
          use-input
          @filter="filterFn"
          new-value-mode="add-unique"
          hide-dropdown-icon
          optionsDense
          max-values="3"
          :rules="[
          () => selectedTags.length > 0 || 'At least one tag is required',
          () => selectedTags.every((tag: string) => /^\S+$/.test(tag)) || 'No space in tag names',
          () => selectedTags.every((tag: string) => tag.length <= 20) || '20 characters max for tag names'
          ]"
        />
      </q-card-section>
      <q-card-actions class="q-pt-none">
        <q-btn
          size="sm"
          type="submit"
          color="primary"
          label="Create Poll"
          :disable="pollOptions.length < 3"
        />
      </q-card-actions>
    </q-card>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePollStore } from 'stores/poll-store';
import { showSigninPopupIfNotConnected } from '../misc/ShowSigninPopupIfNotConnected';
import { distance } from 'fastest-levenshtein';
const pollStore = usePollStore();

// POLL OPTIONS

const defaultOptionText = "I don't know";
const question = ref('');
const pollOptions = ref(['', '', defaultOptionText]);
const showPollFormContent = ref(false);
const pollForm = ref(null);

const addOption = () => {
  pollOptions.value.splice(pollOptions.value.length - 1, 0, ''); // add a blank option before the "I don't know" option
};

const removeOption = (index: number) => {
  if (index === pollOptions.value.length - 1 || pollOptions.value.length <= 3) {
    // if trying to remove the "I don't know" option, or having less than 2 voting options
    // do nothing
    return;
  }
  pollOptions.value.splice(index, 1);
};

const submitForm = () => {
  pollStore.publishPoll(question.value, pollOptions.value, selectedTags.value);
};

// TAGS

const selectedTags = ref([]);

const existingTags: string[] = ['test1', 'test2', 'bonjour'];

const filteredTags = ref(existingTags);

const filterFn = (val: string, update) => {
  if (val === '') {
    update(() => {
      filteredTags.value = existingTags;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    // debugger;
    const close_tag_tuples: [string, number][] = existingTags.map((e) => [
      e,
      distance(e.toLowerCase(), needle),
    ]);
    filteredTags.value = close_tag_tuples
      .filter((e) => e[1] <= 3)
      .sort((e1, e2) => e1[1] - e2[1])
      .slice(0, 10)
      .map((e) => e[0]);
    return;
  });
};

// OTHER
</script>
