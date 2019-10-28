<template>
  <div id="app" v-if="loading">

  </div>
  <div id="app" v-else>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Status</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

export default {
  computed: {
    ...mapGetters(['loading', 'uptimeResponseStatistics']),
  },
  methods: {
    ...mapActions(['getMonitors', 'getIssues']),
  },
  created() {
    this.getMonitors();
    this.getIssues();
  },
};
</script>
