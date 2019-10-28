<template>
  <div role="tablist">
    <b-card no-body class="mb-1" v-for="(u, idx) in uptimeRobot.response" v-bind:key="u.id">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle="`accordion-${idx}`" variant="info" class="text-left">
          {{ u.friendly_name }}
          <b-badge :variant="statusClass(u.status)" class="float-right">
            {{ statusText(u.status) }}
          </b-badge>
        </b-button>
      </b-card-header>
      <b-collapse
        :id="`accordion-${idx}`"
        accordion="my-accordion"
        role="tabpanel"
        v-if="uptimeChartData(idx)"
        >
        <b-card-body>
          <line-chart height=100 v-bind:chart-data="uptimeChartData(idx)" v-bind:options="{}" />
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import LineChart from './LineChart.vue';

export default {
  name: 'overview',
  components: {
    LineChart,
  },
  methods: {
    statusText(status) {
      return status !== 2 ? 'Major Outage' : 'Operational';
    },
    statusClass(status) {
      return status !== 2 ? 'danger' : 'success';
    },
  },
  computed: {
    ...mapState(['uptimeRobot']),
    ...mapGetters(['uptimeChartData']),
  },
};
</script>
