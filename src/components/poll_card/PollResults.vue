<script setup lang="ts">
import { computed, onMounted, reactive, ref, toRef, toRefs } from 'vue';
import { Poll, PollDetailedResults } from 'src/api/models/poll';
import { usePollStore } from 'src/stores/poll-store';
import { QBtn } from 'quasar';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);

// poll data
interface Props {
  poll: Poll;
}
const props = defineProps<Props>();

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
          size: 13
        })),
        color: defaultChartData.labels.map((l) =>
          l == labelWithMyVote ? '#156e28' : '#000'
        ),
      },
    },
  },
  plugins:{
    datalabels: {
        display: true,
        align: 'left',
        anchor: 'end',
        clamp: 'true',
        font: {
          weight: 'bold',
          size: 10,
        }
      },
  }
};

const chartFeatureViews = ref<any>({
  all: {
    feature: 'All',
    color: 'grey',
    disabledDatasets: []
  },
  age: {
    feature: 'By Age',
    color: 'yellow-8',
    disabledDatasets: ['1 - 15', '55 - 70', '70 - 85', '85 - 120']
  },
  gender: {
    feature: 'By Gender',
    color: 'deep-purple-12',
    disabledDatasets: ['Other']
  },
});

const getFeatureDatasets = (featureName: string) => {
  let datasets = {};
  detailedPollResults.options.forEach((option) => {
    option.votesPerFeature.forEach((feature) => {
      if (feature.name === featureName) {
        feature.intervals.forEach((interval) => {
          if (!datasets[interval.label]) {
            datasets[interval.label] = {
              label: interval.label,
              data: [],
              minBarLength: 20,
              hidden: chartFeatureViews.value[featureName].disabledDatasets.includes(interval.label),
            };
          }
          datasets[interval.label].data.push(interval.votesCount);
        });
      }
    });
  });

  return Object.values(datasets);
};

const getChartHeight = (featureNumValues: number) => {
  return optionsCount * featureNumValues * barPixels + 'px';
};

// create chart after canvas is mounted

onMounted(() => {
  const chart = new Chart(document.getElementById(pollChartId), {
    type: 'bar',
    data: { ...defaultChartData },
    options: { ...defaultChartOptions },
  });
  const defaultChartHeight = getChartHeight(1);

  const setFeatureChart = (featureName: string) => {
    const datasets = getFeatureDatasets(featureName);
    const chartHeight = getChartHeight(datasets.length);
    chart.data.datasets = datasets;
    chart.canvas.parentNode.style.height = chartHeight;
    chart.update();
  };

  chartFeatureViews.value.all.chartUpdate = () => {
    chart.data.datasets = defaultChartData.datasets;
    chart.canvas.parentNode.style.height = defaultChartHeight;
    chart.update();
  };
  chartFeatureViews.value.age.chartUpdate = () => {
    setFeatureChart('age');
  };
  chartFeatureViews.value.gender.chartUpdate = () => {
    setFeatureChart('gender');
  };
});
</script>

<template>
  <q-card-section class="text-h6 q-pt-none q-pb-none">
    <div class="chart-container" style="position: relative; min-height: 200px">
      <canvas :id="pollChartId"></canvas>
    </div>

    <q-btn
      v-for="chartView of Object.values(chartFeatureViews)"
      :key="chartView.feature"
      dense
      size="sm"
      :text-color="chartView.color"
      outline
      :label="chartView.feature"
      class="q-mr-sm"
      padding="none xs"
      @click="chartView.chartUpdate"
    />
  </q-card-section>
</template>
