<template>
  <q-form @submit="submitForm">
    <q-card>
      <q-card-section class="q-pb-none" :horizontal="false">
        <q-input
          filled
          v-model="question"
          label="Just poll it."
          lazy-rules
          :rules="[
            (val) => !!val || 'Question is required',
            (val) =>
              (val && val.length >= 3) || 'Question must be at least 3 characters long',
          ]"
        />
      </q-card-section>
      <q-card-section>
        <q-list bordered>
          <q-item v-for="(option, index) in options" :key="index">
            <q-item-section>
              <q-input
                v-model="options[index]"
                :placeholder="'option ' + (index + 1)"
                lazy-rules
                :rules="[
                  (val) => !!val || 'Option can\'t be blank',
                  (val) =>
                    (val && val.length >= 3) ||
                    'Option must be at least 3 characters long',
                ]"
                :disable="index === options.length - 1"
                dense
              />
            </q-item-section>
            <q-item-section
              side
              v-if="index !== options.length - 1 && options.length > 3"
            >
              <q-btn dense flat icon="close" @click="removeOption(index)" />
            </q-item-section>
          </q-item>
        </q-list>
        <q-btn
          v-if="options.length <= 10"
          dense
          color="primary"
          class="q-mt-sm"
          icon="add"
          label="Add Option"
          @click="addOption"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn
          type="submit"
          color="primary"
          label="Create Poll"
          :disable="options.length < 3"
        />
      </q-card-actions>
    </q-card>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const question = ref('');
    const options = ref(['', '', "I don't know"]);

    const addOption = () => {
      options.value.splice(options.value.length - 1, 0, ''); // add a blank option before the "I don't know" option
    };

    const removeOption = (index: number) => {
      if (index === options.value.length - 1 || options.value.length <= 3) {
        // if trying to remove the "I don't know" option, do nothing
        return;
      }
      options.value.splice(index, 1);
    };

    const submitForm = () => {
      // Handle form submission here
      console.log('Form submitted!');
    };

    return {
      question,
      options,
      addOption,
      removeOption,
      submitForm,
    };
  },
});
</script>
