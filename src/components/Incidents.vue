<template>
    <div v-if="activeIncidents.length > 0">
        <b-jumbotron lead="There are incidents">
            <ul class="timeline">
                <li v-for="(incident, idx) in activeIncidents" v-bind:key="idx">
                    <p>{{ incident.title }}</p>
                    <p class="float-right">
                      {{ new Date(Date.parse(incident.created_at)) |
                        dateFormat('YYYY-MM-DD HH:mm:ss') }}
                    </p>
                    <p>{{ incident.body }}</p>
                </li>
            </ul>
        </b-jumbotron>
    </div>
    <div v-else>
        <b-jumbotron lead="No issues....">
        </b-jumbotron>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'incidents',
  methods: {
  },
  computed: {
    ...mapGetters(['activeIncidents']),
  },
};
</script>

<style>
ul.timeline {
    list-style-type: none;
    position: relative;
}
ul.timeline:before {
    content: ' ';
    background: #d4d9df;
    display: inline-block;
    position: absolute;
    left: 29px;
    width: 2px;
    height: 100%;
    z-index: 400;
}
ul.timeline > li {
    margin: 20px 0;
    padding-left: 20px;
}
ul.timeline > li:before {
    content: ' ';
    background: white;
    display: inline-block;
    position: absolute;
    border-radius: 50%;
    border: 3px solid #22c0e8;
    left: 20px;
    width: 20px;
    height: 20px;
    z-index: 400;
}
</style>
