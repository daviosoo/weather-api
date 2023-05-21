const { getCityWeather } = require('../services/requests')
const { getCitiesSuggestions } = require('../services/requests')

async function routes (fastify, options) {
  fastify.get('/cities', async (request, reply) => {
    const { filter } = request.query

    const suggestions = await getCitiesSuggestions(filter)

    const citiesFound = suggestions.features.map(({ properties }) => {
      const { name, coordinates, place_formatted } = properties
      return {
        name,
        coordinates,
        place_formatted
      }
    })

    reply.code(200).send(citiesFound)
  })

  fastify.get('/weather', async (request, reply) => {
    const { longitude, latitude } = request.query

    const { weather, main } = await getCityWeather(longitude, latitude)

    const { name, id } = weather
    const { temp, feels_like, humidity, temp_max } = main

    const weatherInfo = {
      stateId: id,
      state: name,
      temperature: temp,
      temperatureFeels: feels_like,
      temperatureMaximum: temp_max,
      humidity
    }

    reply.code(200).send(weatherInfo)
  })
}

module.exports = routes
