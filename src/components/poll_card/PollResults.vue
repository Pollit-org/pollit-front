<script setup lang="ts">
import { computed, onMounted, reactive, ref, toRef, toRefs } from 'vue';
import { Poll, PollDetailedResults } from 'src/api/models/poll';
import { usePollStore } from 'src/stores/poll-store';
import { QBtn } from 'quasar';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useConnectedUserStore } from 'src/stores/connected-user-store';
Chart.register(ChartDataLabels);

// poll data
interface Props {
  poll: Poll;
}
const props = defineProps<Props>();

const connectedUserStore = useConnectedUserStore();

const poll = computed(() => {
  return props.poll;
}).value;

const pollStore = usePollStore();
const detailedPollResults: PollDetailedResults = computed(() => {
  return pollStore.currentPollDetailedResults!;
}).value;

// chart constants

const optionsCount = poll.options.length;
const barPixels = 20;
const pollChartId = poll.pollId + '-chart';
const labelWithMyVote =
  '\u2713 ' + poll.options.find((option) => option.hasMyVote)?.title;

const defaultChartData = reactive({
  labels: poll.options.map((option) =>
    option.hasMyVote ? labelWithMyVote : option.title
  ),
  datasets: [
    {
      label: 'all voters',
      data: poll.options.map((option) => option.votesCount),
      minBarLength: 20,
    },
  ],
});

const defaultChartOptions = {
  responsive: true,
  indexAxis: 'y',
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        precision: 0,
      },
    },

    y: {
      ticks: {
        font: defaultChartData.labels.map((l) => ({
          weight: l == labelWithMyVote ? '700' : '500',
          family: 'Trebuchet MS, Sans Serif',
          size: 12,
        })),
        color: defaultChartData.labels.map((l) =>
          l == labelWithMyVote ? '#156e28' : '#000'
        ),
      },
    },
  },
  plugins: {
    datalabels: {
      display: true,
      align: 'left',
      anchor: 'end',
      clamp: 'true',
      font: {
        weight: 'bold',
        size: 10,
      },
    },
  },
};

interface Dataset {
  label: string;
  data: number[];
  minBarLength?: number;
  hidden?: boolean;
}

interface ChartFeature {
  displayName: string;
  color: string;
  show: boolean;
  datasets: Dataset[];
}

const getFeatureDatasets = (featureName: string, disabledDatasets: string[] = []) => {
  let datasets: { [key: string]: Dataset } = {};
  if (detailedPollResults === null) {
    return Object.values(datasets);
  }
  detailedPollResults.options.forEach((option) => {
    option.votesPerFeature.forEach((feature) => {
      if (feature.name === featureName) {
        feature.intervals.forEach((interval) => {
          if (!datasets[interval.label]) {
            datasets[interval.label] = {
              label: interval.label,
              data: [],
              minBarLength: 20,
              hidden: disabledDatasets.includes(interval.label),
            };
          }
          datasets[interval.label].data.push(interval.votesCount);
        });
      }
    });
  });

  return Object.values(datasets);
};

const chartFeatures = ref<ChartFeature[]>([
  {
    displayName: 'All',
    color: 'grey-8',
    disabledDatasets: [],
    show: true,
    datasets: defaultChartData.datasets,
  },
  {
    displayName: 'By Age',
    color: 'amber-8',
    show: connectedUserStore.user?.privateProfile?.birthdate !== null ? true : false,
    datasets: getFeatureDatasets('age', ['1 - 15', '55 - 70', '70 - 85', '85 - 120']),
  },
  {
    displayName: 'By Gender',
    color: 'deep-purple-8',
    show: connectedUserStore.user?.privateProfile?.gender !== null ? true : false,
    datasets: getFeatureDatasets('gender', ['Other']),
  },
]);

const getChartHeight = (featureNumValues: number) => {
  return optionsCount * featureNumValues * barPixels + 'px';
};

// create chart after canvas is mounted

let setFeatureChart = ref();

onMounted(() => {
  const chart = new Chart(document.getElementById(pollChartId), {
    type: 'bar',
    data: { ...defaultChartData },
    options: { ...defaultChartOptions },
  });

  setFeatureChart.value = (datasets: Dataset[]) => {
    const chartHeight = getChartHeight(datasets.length);
    chart.data.datasets = datasets;
    chart.canvas.parentNode.style.height = chartHeight;
    chart.update();
  };
});
</script>

<template>
  <q-card-section class="text-h6 q-pt-none q-pb-none">
    <div class="chart-container" style="position: relative; min-height: 200px">
      <canvas :id="pollChartId"></canvas>
    </div>
    <span v-for="chartFeature of Object.values(chartFeatures)" :key="chartFeature.displayName">
      <q-btn
        dense
        size="0.7rem"
        :label="chartFeature.displayName"
        :text-color="chartFeature.color"
        outline
        class="q-mr-sm"
        padding="none xs"
        @click="setFeatureChart(chartFeature.datasets)"
        v-if="chartFeature.show"
      />
    </span>
  </q-card-section>
</template>
