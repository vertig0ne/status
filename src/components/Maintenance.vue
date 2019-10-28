<template>
    <div v-if="activeMaintenance.length > 0">
        <b-jumbotron lead="Maintainence is scheduled">
            <ul class="timeline">
                <li v-for="(incident, idx) in activeMaintenance" v-bind:key="idx">
                    <p>{{ incident.title }}</p>
                    <p class="float-right">{{ incident.date }}</p>
                    <p>{{ incident.body }}</p>
                </li>
            </ul>
            <p v-for="(incident, idx) in activeMaintenance" v-bind:key="idx">
              {{ incident.title }} <br/> {{ incident.body }}
            </p>
        </b-jumbotron>
    </div>
    <div v-else>
        <b-jumbotron lead="There is no maintenance scheduled." />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'maintenance',
  methods: {
  },
  computed: {
    ...mapGetters(['activeMaintenance']),
  },
};
</script>
