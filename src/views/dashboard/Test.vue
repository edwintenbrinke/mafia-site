<template>
  <v-container
    id="regular-forms"
    fluid
    tag="section"
  >
    <cooldown-button name="crime" :cooldown="crimeCooldown" v-on:execute="executeCrime" />
    <cooldown-button name="og crime" :cooldown="organizedCrimeCooldown" v-on:execute="executeOrganizedCrime" />
    <cooldown-button name="GTA" :cooldown="organizedCrimeCooldown" v-on:execute="executeOrganizedCrime" />
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
    computed: {
      ...mapGetters(['crimeCooldown', 'organizedCrimeCooldown'])
    },
    methods: {
      executeCrime: function () {
        this.$http.post(`/crime/standard`)
          .then((response) => {
            console.log(response);
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
            console.log(response);
            this.$toasted.global.success(response.data.message)
            this.$store.commit('setOrganizedCrimeCooldown', response.data.cooldown);
          })
          .catch((error) => {
            console.log(error.response)
          })
      },
      test: function () {
        this.$store.commit('setCrimeCooldown', '2020-01-02T13:49:27+0100');
      }
    }
  }
</script>
