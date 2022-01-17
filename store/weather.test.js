import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import { createStore } from '../.nuxt/store'
import { mutations, state } from './weather'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Weather Store', () => {
  let store

  beforeEach(async () => {
    store = await createStore()
  })

  it('initial current data should be empty', () => {
    expect(store.getters['weather/getWeather']).toEqual({})
  })

  it('initial time zone should be null', () => {
    expect(store.state.weather.timeZone).toBeNull()
  })

  it('set weather data successfully', () => {
    const data = {
      coord: {
        lon: 34.6537,
        lat: 47.9119
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n'
        }
      ],
      base: 'stations',
      main: {
        temp: 1.78,
        feels_like: -1.08,
        temp_min: 0.76,
        temp_max: 1.95,
        pressure: 1019,
        humidity: 91,
        sea_level: 1019,
        grnd_level: 1005
      },
      visibility: 10000,
      wind: {
        speed: 2.68,
        deg: 73,
        gust: 3.13
      },
      clouds: {
        all: 45
      },
      dt: 1639450091,
      sys: {
        type: 1,
        id: 8902,
        country: 'UA',
        sunrise: 1639459408,
        sunset: 1639489728
      },
      timezone: 7200,
      id: 691435,
      name: 'Tomakivka',
      cod: 200
    }
    mutations.setWeather(state, data)
    expect(state.current).toBe(data)
    expect(state.current.country).toBe('Ukraine')
  })

  it('set time zone successfully', () => {
    const data = { timezone: 'Europe/Kiev' }
    mutations.setTimeZone(state, data)
    expect(state.timeZone).toBe(data.timezone)
  })
})
