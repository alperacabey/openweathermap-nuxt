<template>
  <div :class="`hero-wrapper background-${dayPeriod}`">
    <template v-if="weather.name">
      <div class="container d-flex justify-content-between flex-wrap color-white">
        <div class="p-5 text-left">
          <p class="fs-16">
            {{ weather.country }}
          </p>
          <p class="fs-22">
            {{ weather.name }}
          </p>
        </div>
        <div class="p-5 text-right">
          <p class="fs-16">
            {{ date }}
          </p>
          <p class="fs-22">
            {{ time }}
          </p>
        </div>
      </div>

      <WeatherIcons
        :type="weather.weather[0].main"
        :day-period="dayPeriod"
        class="d-md-flex d-none"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  components: {
    WeatherIcons: () =>
      import('@/components/common/WeatherIcons.vue')
  },
  props: {
    weather: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      interval: null,
      time: null
    }
  },
  computed: {
    date () {
      return this.timeZone
        ? Intl.DateTimeFormat(navigator.language, {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          timeZone: this.timeZone
        }).format()
        : null
    },
    timeZone () {
      return this.$store.state.weather.timeZone
    },
    dayPeriod () {
      let hour = 0
      if (this.timeZone) {
        hour = Intl.DateTimeFormat(navigator.language, {
          hour: '2-digit',
          hour12: false,
          timeZone: this.timeZone
        }).format()
      }
      return Number(hour) ? (Number(hour) > 6 && Number(hour) < 18) ? 'sun' : 'moon' : ''
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  created () {
    if (process.browser) {
      this.interval = setInterval(() => {
        if (this.timeZone) {
          this.time = Intl.DateTimeFormat(navigator.language, {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: this.timeZone
          }).format()
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
.hero-wrapper {
    min-height: calc(100vh/2 - 40px);
    box-shadow: 0 0.25rem 0.25rem #00000040, inset 0 -1px 5px #00000040;
}
.background-sun{
    background-image: url('@/assets/images/sun.jpg');
    background-size: cover;
}

.background-moon{
    background-image: url('@/assets/images/moon.jpg');
    background-size: cover;
}
</style>
