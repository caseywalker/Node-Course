const request = require('postman-request')

const forecast = (location, callback) => {
  location = ''
  const url = 'http://api.weatherstack.com/current?access_key=1bc3ff8f5776e41e93eaa898efd2d371&query=36.1744,-86.7679&units=f'

  request({ url: url, json: true }, (error, response) => {
    const data = response.body
    console.log(`Current conditions: ${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degrees out. It feels like ${data.current.feelslike} degrees out.`)
  })

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to service!', undefined)
    } else if (response.body.current == null){
      callback('Unable to find location, please try another search', undefined)
    } else {
      callback(undefined, {
        currentConditions: response.body.current.weather_descriptions[0],
        currentTemp: response.body.current.temperature,
        feelsLike: response.body.current.feelslike
      })
    }
  })
}

module.exports = forecast