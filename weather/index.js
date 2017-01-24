const Rx = require('rxjs/Rx')
const fetch = require('./fetch-weather')

function logResult ({ city, weather }) {
  console.log(`${city}: ${weather}`)
}

function getWeatherForCity (city) {
  return Rx.Observable
    .from(fetch(city))
    .map((response) => response.weather)
    .map((weather) => ({ city, weather }))
}

const weatherFeed = Rx.Observable
  .from(['Berlin', 'London', 'New York'])
  .mergeMap(getWeatherForCity)

weatherFeed.subscribe(logResult)
