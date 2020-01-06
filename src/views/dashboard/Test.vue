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
    <v-img :src="car_image" width="450" height="350"/>
  </v-container>

</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: 'DeshboardTest',
    components: {
      CooldownButton: () => import('./components/custom/CooldownButton'),
    },
    data() {
      return {
        car_image: "http://localhost:8000/images/cars/subaru_wrx_sti.jpg",
      }
    },
    methods: {
      executeCrime: function () {
        this.$http.post(`/crime/standard`)
          .then((response) => {
            this.$toasted.global.success(response.data.message)
            this.$store.commit('setCrimeCooldown', response.data.cooldown);
          })
          .catch((error) => {
            if (error.response.status === 400) {
              let response = JSON.parse(error.response.data.detail);
              console.log(response,2);
              if (response.error_code === 1) {
                this.$toasted.global.error(response.message)
                this.$store.commit('setCrimeCooldown', response.cooldown);
              }
            }

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
            if (response.data.car) {
              this.car_image = `http://localhost:8000/images/cars/${response.data.car.image_path}`;
            }

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
