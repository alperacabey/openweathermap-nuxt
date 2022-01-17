<template>
  <header
    class="navbar bd-navbar"
  >
    <AutoComplete
      id="search-country"
      :data="countryList"
      placeholder="Search country"
      :selected="selectedCountry"
      :loading="false"
      :state="!selectedCountry.name ? false : null"
      class="mr-2 ml-2"
      @onSelect="countryOnSelect"
    />

    <TextField
      id="search-city"
      :value="citySearchText"
      placeholder="Search city"
      :loading="false"
      :state="selectedCountry.name && !citySearchText ? false : null"
      :disabled="!selectedCountry.name"
      class="mr-2 ml-2"
      @input="(val)=> citySearchText=val"
    />
  </header>
</template>

<script>

import AutoComplete from '../common/AutoComplete'
import TextField from '../common/TextField'
const countries = require('i18n-iso-countries')
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))
export default {
  name: 'HeaderBar',

  components: {
    AutoComplete,
    TextField
  },

  data () {
    return {
      countryList: [],
      selectedCountry: {
        id: '',
        name: ''
      },
      citySearchText: ''
    }
  },
  watch: {
    citySearchText (newVal, oldVal) {
      if (newVal !== oldVal && newVal) {
        const params = { cityName: newVal, countryCode: this.selectedCountry.id }
        this.$store.dispatch('weather/fetchWeatherByCity', params)
      }
    }
  },

  mounted () {
    this.countryList = Object.keys(countries.getNames('en', { select: 'official' })).map(key =>
      ({ id: key, name: countries.getNames('en', { select: 'official' })[key] })
    )
    this.$store.dispatch('weather/fetchWeatherByCoordinates')
  },

  methods: {
    redirectTo (link) {
      window.open(link, '_self')
    },
    countryOnSelect (val) {
      this.selectedCountry = val
      this.countrySearchText = val.name
      this.citySearchText = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.bd-navbar {
  box-shadow: 0 0.25rem 0.25rem #00000040, inset 0 -1px 5px #00000040;
  justify-content: center;
  min-height: 80px;
}
</style>
