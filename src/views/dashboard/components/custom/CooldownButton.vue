<template>
  <div>
    <v-btn :disabled="disabled" @click="execute">{{name}}</v-btn>
  </div>
</template>

<script>
export default {
  name: 'CooldownButton',
  props: {
    cooldown: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      disabled: false,
      display_name: null,
    }
  },
  mounted() {
    // on reload of the page start the cooldown again if necessary
    if (new Date(this.cooldown) - new Date() > 0)
    {
      this.setCooldown(this.cooldown);
    }
  },
  watch: {
    cooldown: function (value) {
      this.setCooldown(value);
    }
  },
  methods: {
    execute: function() {
      // disable button before api call begins
      this.disabled = true
      this.$emit('execute')
    },
    setCooldown: function (value) {
      let future = new Date(value);
      let now = new Date();
      let time = future.getTime() - now.getTime();
      if (time <= 0) {
        this.disabled = false;
        return
      }
      // if cooldown gets changed without button press it still need to get disabled
      if (!this.disabled) {this.disabled = true}

      setTimeout(
        function () {
          this.disabled = false
        }.bind(this),
        time
      );
    }
  }
}
</script>
