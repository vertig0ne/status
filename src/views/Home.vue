<template>
  <div class="home">
    <h1>Status Page</h1>
    <h2>Overview</h2>
    <overview/>

    <h2>Upcoming Maintenance</h2>
    <maintenance/>

    <h2>Incidents</h2>
    <incidents/>

    <h2>Statistics</h2>
    <v-client-table
      v-if="uptimeResponseStatistics"
      v-bind:data="uptimeResponseStatistics"
      v-bind:columns="['name', 'day', 'week', 'biweek', 'month', 'forever']"
      v-bind:options="{ filterable: false }"
    >
    </v-client-table>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Overview from '@/components/Overview.vue';
import Incidents from '@/components/Incidents.vue';
import Maintenance from '@/components/Maintenance.vue';

export default {
  name: 'home',
  components: {
    Overview,
    Incidents,
    Maintenance,
  },
  computed: {
    ...mapGetters(['uptimeResponseStatistics']),
  },
};
</script>
