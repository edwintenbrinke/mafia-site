<template>
  <v-app-bar
    absolute
    app
    color="transparent"
    flat
    height="75"
    style="width: auto;"
  >
    <v-btn
      fab
      small
      @click="$vuetify.breakpoint.smAndDown ? setDrawer(!drawer) : $emit('input', !value)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-spacer />

      <v-card
        class="margin-null v-card--plan pb-2 px-2 text-center"
        max-width="100%"
      >
        <div
          class="body-2 text-uppercase grey--text"
          v-text="`crime`"
        />
        <cooldown classes="body-1 font-weight-light pa-1" :cooldown="crimeCooldown" />
      </v-card>

      <v-card
        class="margin-null v-card--plan pb-2 px-2 text-center"
        max-width="100%"
      >
        <div
          class="body-2 text-uppercase grey--text"
          v-text="`organized crime`"
        />
        <cooldown classes="body-1 font-weight-light pa-1" :cooldown="organizedCrimeCooldown" />
      </v-card>

    <v-spacer />



    <v-btn
      class="white"
      @click="$_logout(null)"
    >
      <v-icon
        left
        v-text="logout_icon"
      />
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script>
  // Components
  import { VHover, VListItem } from 'vuetify/lib'

  // Utilities
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import CooldownButton from "../custom/CooldownButton";
  import Cooldown from "../custom/Cooldown";

  export default {
    name: 'DashboardCoreAppBar',
    components: {Cooldown, CooldownButton},
    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      logout_icon: 'mdi-exit-to-app',
    }),

    computed: {
      ...mapState(['drawer']),
      ...mapGetters(['crimeCooldown', 'organizedCrimeCooldown'])
    },

    mounted() {
      // TODO Not happy with this
      // place it somewhere else
      // problem with that the listeners need to get set before this data is gotten
      this.$http.get('/user/profile')
        .then((response) => {
            let data = response.data[0];
            if (data.cooldown)
            {
              this.$store.commit('setUser', data);
              this.$store.commit('setCrimeCooldown', data.cooldown.crime);
              this.$store.commit('setOrganizedCrimeCooldown', data.cooldown.organized_crime);
            }
          }
        )
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
    },
  }
</script>

<style>
  .margin-null {
    margin: 0px 5px;
  }
</style>
