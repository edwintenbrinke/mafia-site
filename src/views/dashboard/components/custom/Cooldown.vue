<template>
  <div>
    <span :class="classes">{{ display_name | millisecondsToCooldown }} </span>
  </div>
</template>

<script>
export default {
  name: 'Cooldown',
  props: {
    classes: {
      type: String,
      required: false
    },
    cooldown: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      display_name: null,
      interval: null
    }
  },
  watch: {
    cooldown: function (value) {
      let future = new Date(value);
      let now = new Date();
      let time = future.getTime() - now.getTime();
      if (time <= 0) {
        return
      }

      this.display_name = time;
      this.interval = setInterval(function() {
        this.display_name = future - new Date();
        if ((future - new Date()) <= 1000) clearInterval(this.interval)
      }.bind(this), 1000)
    }
  },
}
</script>
