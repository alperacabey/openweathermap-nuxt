import Vue from 'vue'
import WeatherService from '@/services/weather'
const countries = require('i18n-iso-countries')

export const state = () => ({
  current: {},
  timeZone: null
})

export const getters = {
  getWeather (state) {
    return state.current
  }
}

export const mutations = {
  setWeather (state, value) {
    state.current = value
    state.current.country = countries.getName(value.sys.country, 'en', { select: 'official' })
    state.current.sys.sunrise = new Date(value.sys.sunrise * 1000)
    state.current.sys.sunset = new Date(value.sys.sunset * 1000)
  },
  setTimeZone (state, value) {
    state.timeZone = value.timezone
  }
}

export const actions = {
  async fetchWeatherByCity ({ commit, dispatch }, params) {
    try {
      const { data } = await WeatherService.getWeatherByCity(params)
      debugger
      if (data.sys.country === params.countryCode) {
        commit('setWeather', data)
        dispatch('fetchTimeZone')
      } else {
        Vue.notify({
          group: 'notification',
          title: 'Error',
          type: 'error',
          text: 'City Not Found'
        })
      }
    } catch {
      Vue.notify({
        group: 'notification',
        title: 'Error',
        type: 'error',
        text: 'City Not Found'
      })
    }
  },

  async fetchWeatherByCoordinates ({ commit, dispatch }) {
    try {
      const { data } = await WeatherService.getWeatherByCoordinates()
      if (data.name) {
        commit('setWeather', data)
        dispatch('fetchTimeZone')
      } else { dispatch('fetchWeatherByCoordinates') }
    } catch (e) {
      Vue.notify({
        group: 'notification',
        title: 'Error',
        type: 'error',
        text: 'Invalid API key. Please see http://openweathermap.org/faq#error401 for more info.'
      })
    }
  },

  async fetchTimeZone ({ commit, dispatch, state }, params) {
    const { data } = await WeatherService.getTimeZone({ lat: state.current.coord.lat, lon: state.current.coord.lon })
    if (data.timezone) {
      commit('setTimeZone', data)
    }
  }
}
