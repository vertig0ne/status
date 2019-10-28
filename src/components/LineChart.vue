<script>
import { Line } from 'vue-chartjs';

export default {
  name: 'line-chart',
  extends: Line,
  props: ['chartData'],
  data() {
    return {
      options: {
        responsive: true,
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  watch: {
    chartData() {
      this.renderChart(this.chartData, this.options);
    },
  },
};
</script>
