<template>
  <q-form @submit="submitForm">
    <q-card bordered>
      <q-input
        dense
        class="q-pt-md q-pl-md q-pb-none"
        v-model="question"
        label="Just poll it..."
        lazy-rules="ondemand"
        :rules="[(val) => /\S/.test(val) || 'Question is required']"
      />
      <q-card-section class="q-pb-xs">
        <q-list bordered dense>
          <q-item v-for="(option, index) in options" :key="index" dense>
            <q-item-section dense>
              <q-input
                size="xs"
                class="q-pb-sm"
                v-model="options[index]"
                :placeholder="'option ' + (index + 1)"
                lazy-rules="ondemand"
                :rules="[(val) => /\S/.test(val) || 'Option can\'t be blank']"
                :disable="index === options.length - 1"
                dense
              />
              <q-tooltip v-if="index === options.length - 1"
                >"{{ default_option_text }}" default option can't be removed.</q-tooltip
              >
            </q-item-section>
            <q-item-section
              side
              v-if="index !== options.length - 1 && options.length > 3"
            >
              <q-btn dense flat icon="close" @click="removeOption(index)" />
            </q-item-section>
          </q-item>
          <q-btn
            v-if="options.length <= 10"
            dense
            size="xs"
            color="primary"
            class="q-ma-sm"
            icon="add"
            @click="addOption"
          />
        </q-list>
      </q-card-section>
      <q-card-actions>
        <q-btn
          size="sm"
          type="submit"
          color="primary"
          label="Create Poll"
          :disable="options.length < 3"
        />
      </q-card-actions>
    </q-card>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const default_option_text = "I don't know";
const question = ref('');
const options = ref(['', '', default_option_text]);

const addOption = () => {
  options.value.splice(options.value.length - 1, 0, ''); // add a blank option before the "I don't know" option
};

const removeOption = (index: number) => {
  if (index === options.value.length - 1 || options.value.length <= 3) {
    // if trying to remove the "I don't know" option, or having less than 2 voting options
    // do nothing
    return;
  }
  options.value.splice(index, 1);
};

const submitForm = () => {
  // Handle form submission here
  console.log('Form submitted!');
};
</script>
