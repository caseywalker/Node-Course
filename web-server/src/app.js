const path = require('path')
const express = require('express')

console.log(__dirname)
const publicDirectoryPath = path.join(__dirname, '../public')


const app = express()

app.use(express.static(publicDirectoryPath))

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'This is the forecast',
    location: 'Your location'
  })
})


app.listen(3000, () => [
  console.log('Started server on port 3000...')
])