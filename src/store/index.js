import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    urLoading: false,
    ghLoading: false,
    uptimeRobot: {
      monitors: ['m779828614-2b8e76a1f638f179db6f01be',
        'm779757287-11996787b4a4ddb79cae343b',
        'm779757278-82acbbedc86d26ebbc129945',
        'm779762016-33deea24d6a3e73e524d8ab0',
        'm779870719-a710902a0c001a03244eac5e',
        'm779870718-eada06ba00200d8ced148b37'],
      response: {},
    },
    gitHub: {
      user: 'vertig0ne',
      repo: 'statuspage',
      results: {},
      maintenance: [],
      issues: [],
    },
  },
  mutations: {
    SET_UR_RESPONSE(state, { key, data }) {
      state.uptimeRobot.response[key] = data;
    },
    SET_MAINTENANCE(state, data) {
      state.gitHub.maintenance = data;
    },
    SET_ISSUES(state, data) {
      state.gitHub.issues = data;
    },
    SET_UR_LOADING(state, data) {
      state.urLoading = data;
    },
    SET_GH_LOADING(state, data) {
      state.ghLoading = data;
    },
  },
  actions: {
    getIssues: ({ commit, state }, setLoading = true) => {
      if (setLoading) commit('SET_GH_LOADING', true);
      const today = new Date();
      today.setDate(today.getDate() - 14);
      // const date = today.toISOString();
      axios.get(`https://api.github.com/repos/${state.gitHub.user}/${state.gitHub.repo}/issues?state=all&`).then(({ data }) => {
        const maintenance = [];
        const issues = [];
        data.forEach((issue) => {
          if (issue.labels.reduce(x => x.name === 'maintenance') && issue.state === 'open') maintenance.push(issue);
          else issues.push(issue);
        });
        commit('SET_MAINTENANCE', maintenance);
        commit('SET_ISSUES', issues);
        if (setLoading) commit('SET_GH_LOADING', false);
      });
    },
    getMonitors: ({ commit, state }, setLoading = true) => {
      if (setLoading) commit('SET_UR_LOADING', true);
      const promises = [];
      state.uptimeRobot.monitors.forEach((key) => {
        const opt = {
          api_key: key,
          format: 'json',
          logs: 1,
          response_times: 1,
          all_time_uptime_ratio: 1,
          custom_uptime_ratios: '1-7-14-30',
          response_times_average: 30,
        };
        const a = axios.post('https://api.uptimerobot.com/v2/getMonitors', opt)
          .then(({ data }) => {
            commit('SET_UR_RESPONSE', { key, data: { ...data.monitors[0] } });
          });
        promises.push(a);
      });
      Promise.all(promises).then(() => { if (setLoading) commit('SET_UR_LOADING', false); });
    },
  },
  getters: {
    loading: state => state.ghLoading || state.urLoading,
    activeIncidents: state => state.gitHub.issues,
    activeMaintenance: state => state.gitHub.maintenance,
    uptimeChartData: state => (key) => {
      const data = [];
      const labels = [];

      state.uptimeRobot.response[key].response_times.forEach((dp) => {
        labels.push(new Date(dp.datetime * 1000).toLocaleString());
        data.push(dp.value);
      });
      if (data.length === 0) return false;
      return { datasets: [{ data }], labels };
    },
    uptimeResponseStatistics: (state) => {
      const res = [];
      Object.keys(state.uptimeRobot.response).forEach((id) => {
        const u = state.uptimeRobot.response[id];
        const forever = u.all_time_uptime_ratio;
        const name = u.friendly_name;
        const ratios = u.custom_uptime_ratio.split('-');
        const day = ratios[0];
        const week = ratios[1];
        const biweek = ratios[2];
        const month = ratios[3];
        res.push({
          id, name, day, week, biweek, month, forever,
        });
      });
      return res;
    },
  },
  modules: {
  },
});
