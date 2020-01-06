<template>
  <v-container
    id="regular-forms"
    fluid
    tag="section"
  >
    <cooldown-button name="crime" :cooldown="$store.state.user.cooldown.crime" v-on:execute="executeCrime" />
    <cooldown-button name="og crime" :cooldown="$store.state.user.cooldown.organized_crime" v-on:execute="executeOrganizedCrime" />
    <cooldown-button name="GTA" :cooldown="$store.state.user.cooldown.grand_theft_auto" v-on:execute="executeGrandTheftAuto" />
    <button @click="test">test</button>
  </v-container>

</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: 'DeshboardTest',
    components: {
      CooldownButton: () => import('./components/custom/CooldownButton'),
    },
    methods: {
      executeCrime: function () {
        this.$http.post(`/crime/standard`)
          .then((response) => {
            this.$toasted.global.success(response.data.message)
            this.$store.commit('setCrimeCooldown', response.data.cooldown);
          })
          .catch((error) => {
            console.log(error.response)
          })
      },
      executeOrganizedCrime: function () {
        this.$http.post(`/crime/organized`)
          .then((response) => {
            this.$toasted.global.success(response.data.message)
            this.$store.commit('setOrganizedCrimeCooldown', response.data.cooldown);
          })
          .catch((error) => {
            console.log(error.response)
          })
      },
      executeGrandTheftAuto: function () {
        this.$http.post(`/crime/grand-theft-auto`)
          .then((response) => {
            this.$toasted.global.success(response.data.message)
            this.$store.commit('setGrandTheftAutoCooldown', response.data.cooldown);
          })
          .catch((error) => {
            console.log(error.response)
          })
      },
      test: function () {
        // this.$store.commit('setCrimeCooldown', '2020-01-02T13:49:27+0100');
        this.$store.state.http_progress = 50;
      }
    }
  }
</script>
