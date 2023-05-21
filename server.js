const fastify = require('fastify')({ logger: true })
const dotenv = require('dotenv')

const weatherRoutes = require('./routes/weather-routes')

dotenv.config()

fastify.register(weatherRoutes)

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
