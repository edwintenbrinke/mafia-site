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



    <v-col
      cols="12"
      md="6"
    >
      <v-card
        class="margin-null v-card--plan pb-2 px-2 text-center"
        max-width="500"
      >
        <div
          class="body-2 text-uppercase grey--text"
          v-text="car.name"
        />

        <v-col
          cols="12"
          class="px-0"
        >
          <v-divider />
        </v-col>

  <!--      <v-row align="center" justify="center">-->
          <v-img class="text-center" :src="car_image" max-width="100%" max-height="100%"/>
  <!--      </v-row>-->

        <v-col
          cols="12"
          class="px-0"
        >
          <v-divider />
        </v-col>

        <template>
          <div class="font-weight-light grey--text">
            Price: <strong>{{(car.price) * ((100 - car.damage) / 100) | money }}</strong>
          </div>

          <v-spacer />

          <span class="caption grey--text font-weight-light">
            Damage: <strong>{{(car.price) * (car.damage / 100) | money }}{{` | ${car.damage}%`}}</strong>
          </span>
        </template>
      </v-card>
    </v-col>


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
        car: {"name":"Lamborghini Aventador","price":85000,"damage":11,"image_path":"lamborghini_aventador.jpg","created_at":"2020-01-07T09:33:56+01:00","updated_at":"2020-01-07T09:33:56+01:00"}
      }
    },
    computed: {
      car_image: function () {
        return `${process.env.VUE_APP_BASE_URL_API}images/cars/${this.car.image_path}`
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
              if (response.error_code === 1) {
                this.$toasted.global.error(response.message)
                this.$store.commit('setCrimeCooldown', response.cooldown);
              }
            }
          })
      },
      executeOrganizedCrime: function () {
        this.$http.post(`/crime/organized`)
          .then((response) => {
            this.$toasted.global.success(response.data.message)
            this.$store.commit('setOrganizedCrimeCooldown', response.data.cooldown);
          })
          .catch((error) => {
            if (error.response.status === 400) {
              let response = JSON.parse(error.response.data.detail);
              if (response.error_code === 1) {
                this.$toasted.global.error(response.message)
                this.$store.commit('setOrganizedCrimeCooldown', response.cooldown);
              }
            }
          })
      },
      executeGrandTheftAuto: function () {
        this.$http.post(`/crime/grand-theft-auto`)
          .then((response) => {
            if (response.data.car) this.car = response.data.car;

            this.$toasted.global.success(response.data.message)
            this.$store.commit('setGrandTheftAutoCooldown', response.data.cooldown);
          })
          .catch((error) => {
            if (error.response.status === 400) {
              let response = JSON.parse(error.response.data.detail);
              if (response.error_code === 1) {
                this.$toasted.global.error(response.message)
                this.$store.commit('setGrandTheftAutoCooldown', response.cooldown);
              }
            }
          })
      },
      test: function () {
        // this.$store.commit('setCrimeCooldown', '2020-01-02T13:49:27+0100');
        // this.$store.state.http_progress = 50;
      }
    }
  }
</script>
