<template>
  <div>
    <Hero :weather="weather" />
    <div v-if="weather.name" class="d-flex justify-content-center">
      <div class="card p-4">
        <div class="d-flex flex-column temp mb-3">
          <Temperature
            :value="weather.main.temp"
            :high="weather.main.temp_max"
            :low="weather.main.temp_min"
          />
        </div>
        <div class="d-flex">
          <div class="temp-details w-100">
            <p>
              <font-awesome-icon class="ml-0" :icon="['fas', 'cloud']" /> <span> {{ weather.clouds.all }} % </span>
            </p>
            <p>
              <font-awesome-icon class="ml-0" :icon="['fas', 'wind']" /><span> {{ weather.wind.speed }} m/s </span>
            </p>
            <p>
              <font-awesome-icon class="ml-0" :icon="['fas', 'tint']" /> <span> {{ weather.main.humidity }} % </span>
            </p>
          </div>
          <div class="d-flex align-items-center flex-column">
            <img :src="`${imgUrl}${weather.weather[0].icon}@2x.png`" width="100px">
            <p class="color-black">
              {{ weather.weather[0].main.toLowerCase() }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    Hero: () =>
      import('~/components/layout/Hero.vue'),
    Temperature: () =>
      import('@/components/common/Temperature.vue')
  },

  data () {
    return {
      imgUrl: process.env.IMG_URL
    }
  },

  computed: {
    weather () {
      return this.$store.state.weather.current
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
.card{
  width: 500px;
  margin-top: -200px;
  border-radius: 25px;
  @include box-shadow(0 3px 10px 0 rgba(0, 0, 0, 0.1));

  .temp-details {
    color: black;
    position: relative;
  }

  @media (max-width: 768px) {
    margin-top: 0px;
  }
}

</style>
