<template>
  <section class="d-flex justify-content-center">
    <div class="temp text-right mr-3">
      {{ (scaleSymbol === 'C')? value.toFixed(0) : fahrenheitValue }}
    </div>
    <div class="temp-right">
      <div class="temp-scale">
        <a href="#" @click.prevent="toggleTemperature">&deg;{{ scaleSymbol }}</a>
      </div>
      <div class="temp-high">
        <span>Max :{{ (scaleSymbol === 'C')? high.toFixed(0) : fahrenheitHigh }}</span>&deg;
      </div>
      <div class="temp-low">
        <span>Min :{{ (scaleSymbol === 'C')? low.toFixed(0) : fahrenheitLow }}</span>&deg;
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Temperature',

  props: {
    value: {
      type: Number,
      required: true
    },
    high: {
      type: Number,
      required: true
    },
    low: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      scale: 'Celcius'
    }
  },

  computed: {
    scaleSymbol () {
      return this.scale.charAt(0)
    },

    fahrenheitValue () {
      return this.toFahrenheit(this.value)
    },

    fahrenheitHigh () {
      return this.toFahrenheit(this.high)
    },

    fahrenheitLow () {
      return this.toFahrenheit(this.low)
    }
  },

  methods: {
    toFahrenheit (value) {
      return Math.floor((value * 1.8) + 32)
    },

    toggleTemperature () {
      (this.scale === 'Celcius') ? this.scale = 'Fahrenheit' : this.scale = 'Celcius'
    }
  }
}
</script>

<style lang="scss" scoped>
section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: black;
}

.temp {
    font-size: 7em;
    width: 100%;
}

.temp-right {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.temp-scale {
    padding-top: 5px;
    font-size: 2em;
    font-weight: bold;
}

.temp-high img {
    vertical-align: middle;
}

.temp-low img {
    vertical-align: middle;
}
</style>
