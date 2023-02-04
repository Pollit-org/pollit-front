<script setup lang="ts">
import { ref } from 'vue'
import PollCard from './PollCard.vue';

const items = ref([{}, {}, {}, {}, {}, {}, {}])

const onLoadRef = (index, done) => {
  setTimeout(() => {
    items.value.push({}, {}, {}, {}, {}, {}, {})
    done()
  }, 2000)
}

</script>

<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="onLoadRef" :offset="250">
      <poll-card></poll-card>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>