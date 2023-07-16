<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Poll, PollDetailedResults } from 'src/api/models/poll';
import { usePollStore } from 'src/stores/poll-store';
import { QBtn } from 'quasar';
import Chart from 'chart.js/auto';

// current poll data

interface Props {
  poll: Poll;
}
const props = defineProps<Props>();
const pollStore = usePollStore();
const detailedPollResults: PollDetailedResults = pollStore.currentPollDetailedResults!;

// constants

const pollChartId = props.poll.pollId + '-chart';
const labelWithMyVote =
  '\u2713 ' + props.poll.options.find((option) => option.hasMyVote)?.title;

const defaultChartData = {
  labels: props.poll.options.map((option) =>
    option.hasMyVote ? labelWithMyVote : option.title
  ),
  datasets: [
    {
      label: props.poll.title,
      data: props.poll.options.map((option) => option.votesCount),
    },
  ],
};

const defaultChartOptions = {
  responsive: true,
  indexAxis: 'y',
  scale: {
    ticks: {
      precision: 0,
      font: defaultChartData.labels.map((l) => ({
        weight: l == labelWithMyVote ? 'bold' : 'normal',
      })),
    },
  },
};
const chartFeatureViews = ref<any>([]);

const getFeatureDatasets = (featureName: string) => {
  let datasets = {};

  for (let feature of detailedPollResults.options[0].votesPerFeature) {
    if (feature.name === featureName) {
      for (let interval of feature.intervals) {
        console.log(interval.label);
        datasets[interval.label] = {
          label: interval.label,
          data: [],
        };
      }
      break;
    }
  }

  for (let option of detailedPollResults.options) {
    for (let feature of option.votesPerFeature) {
      if (feature.name === featureName) {
        for (let interval of feature.intervals) {
          datasets[interval.label].data.push(interval.votesCount);
        }
      }
    }
  }
  return Object.values(datasets);
};

// load default chart

onMounted(() => {
  const chart = new Chart(document.getElementById(pollChartId), {
    type: 'bar',
    data: { ...defaultChartData },
    options: { ...defaultChartOptions },
  });

  chartFeatureViews.value = [
    {
      feature: 'Default',
      chartUpdate: () => {
        chart.data.datasets = defaultChartData.datasets;
        chart.update();
      },
    },
    {
      feature: 'By Age',
      chartUpdate: () => {
        chart.data.datasets = getFeatureDatasets('age');
        chart.update();
      },
    },
    {
      feature: 'By Gender',
      chartUpdate: () => {
        chart.data.datasets = getFeatureDatasets('gender');
        chart.update();
      },
    },
  ];
});
</script>

<template>
  <q-card-section class="text-h6 q-pt-none q-pb-none">
    <canvas :id="pollChartId"></canvas>
    <q-btn
      v-for="action in chartFeatureViews"
      :key="action.feature"
      dense
      size="sm"
      color="secondary"
      :label="action.feature"
      class="q-mr-sm"
      padding="none xs"
      @click="action.chartUpdate"
    />
  </q-card-section>
</template>
