const request = require('postman-request')
const forecast = require('./utils/forecast')

forecast('blank', (error, data) =>{
  console.log('Error', error)
  console.log('Data', data)
})