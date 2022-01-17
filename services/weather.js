import axios from 'axios'
import { generateRandomPoints } from '@/utils/helpers'
class WeatherService {
  constructor () {
    this.weatherApi = axios.create({
      baseURL: process.env.WEATHER_API,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.randomCor = null
  }

  getWeatherByCity ({ cityName, countryCode }) {
    return this.weatherApi.get(`weather?q=${cityName},0,${countryCode}&appid=${process.env.API_KEY}&units=metric`)
  }

  getWeatherByCoordinates () {
    this.randomCor = generateRandomPoints({ lat: 52, lng: 13 }, 1000000, 1)
    return this.weatherApi.get(`weather?lat=${this.randomCor[0].lat}&lon=${this.randomCor[0].lng}&appid=${process.env.API_KEY}&units=metric`)
  }

  getTimeZone ({ lat, lon }) {
    return this.weatherApi.get(`onecall?exclude=current,daily,hourly,minutely&lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`)
  }
}

export default new WeatherService()
