const axios = require('axios')

const axiosMapBoxInstance = axios.create({
  baseURL: 'https://api.mapbox.com/search/geocode/v6',
  timeOut: 1000
})

const axiosOpenWeatherInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeOut: 1000
})

const getCitiesSuggestions = async (filter) => {
  try {
    const { data: citiesFound } = await axiosMapBoxInstance.get('/forward', {
      params: {
        q: filter,
        language: 'en',
        limit: 3,
        access_token: process.env.MAPBOX_TOKEN
      }
    })

    return citiesFound
  } catch (e) {
    console.log(e)
  }
}

const getCityWeather = async (longitude, latitude) => {
  try {
    const { data: weatherInfo } = await axiosOpenWeatherInstance.get(
      '/weather',
      {
        params: {
          lat: latitude,
          lon: longitude,
          units: 'metric',
          appid: process.env.OPENWEATHER_TOKEN
        }
      }
    )

    return weatherInfo
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  getCitiesSuggestions,
  getCityWeather
}
