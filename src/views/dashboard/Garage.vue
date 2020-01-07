<template>
  <v-container
    id="regular-forms"
    fluid
    tag="section"
  >
    <button @click="getGarage">test</button>
    <v-row>
      <v-col
        v-for="car in garage.cars"
        cols="12"
        md="3"
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
          <v-img class="text-center" :src="base_url + car.image_path" max-width="100%" max-height="100%"/>
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
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Garage',
    data() {
      return {
        garage: {}
      }
    },
    mounted() {
      this.getGarage();
    },
    computed: {
      base_url: function () {
        return `${process.env.VUE_APP_BASE_URL_API}images/cars/`
      }
    },
    methods: {
      getGarage: async function () {
        this.$http.get(`/garage/cars`)
          .then((response) => {
            this.garage = response.data[0];
          })
          .catch((error) => {

          })
      },
    }
  }
</script>
