<template>
  <div class="d-flex q-gutter-x-sm row">
    <q-chip :disable="globalStore.isLoadingGlobal" dark :color="pollStore.filters.orderBy == 1 ? 'primary' : 'disabled'" :clickable="pollStore.filters.orderBy != 1" @click="setOrderBy(1)">New</q-chip>
    <q-chip :disable="globalStore.isLoadingGlobal" dark :color="pollStore.filters.orderBy == 3 ? 'primary' : 'disabled'" :clickable="pollStore.filters.orderBy != 3" @click="setOrderBy(3)">Trending</q-chip>
    <q-chip :disable="globalStore.isLoadingGlobal" dark :color="pollStore.filters.orderBy == 2 ? 'primary' : 'disabled'" :clickable="pollStore.filters.orderBy != 2" @click="setOrderBy(2)">Top</q-chip>
    <q-select :disable="globalStore.isLoadingGlobal"
        v-if="pollStore.filters.orderBy == 2"
        style="max-width: 30%; width: 120px"
        :model-value="topFilterOptionChosen"
        :options="topFilterOptions"
        dense
        class="self-end q-px-none q-py-none"
        input-class="q-py-none self-end"
        input-style="line-height: inherit; display: none;"
        @update:model-value="onTopFilterChanged"
      />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePollStore } from 'stores/poll-store';
import moment from 'moment';
import { useGlobalStore } from 'src/stores/global-store';

const pollStore = usePollStore();
const globalStore = useGlobalStore();

interface Props {
  orderBy?: number;
  order?: number;
  createdAfter?: string
}

const props = withDefaults(defineProps<Props>(), {
  orderBy: 1,
  order: -1
});

const topFilterOptions = ref([
  { label: 'Last 24h', value: 24 },
  { label: 'Last week', value: 24 * 7 },
  { label: 'Last month', value: 24 * 30 },
  { label: 'All time', value: 0 },
]);

const topFilterOptionChosen = ref(topFilterOptions.value[3]);

const onTopFilterChanged = async (topFilter: { label: string, value: number }) => {
  pollStore.resetPaging();
  topFilterOptionChosen.value = topFilter;
  pollStore.setFilters(Object.assign(pollStore.filters, {
    createdAfter: topFilter.value == 0 ? null : moment.utc().add(-topFilter.value, 'hours').format()
  }));
  await pollStore.fetchMore();
};

const setOrderBy = async (orderBy: number) => {
  pollStore.reset();
  pollStore.setFilters(Object.assign(pollStore.filters, { orderBy: orderBy }));
  await pollStore.fetchMore();
}

// OTHER
</script>
