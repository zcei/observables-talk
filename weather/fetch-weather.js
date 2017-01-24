const weathers = {
  Berlin: { weather: 'partly sunny', updated: 1485253977703 },
  London: { weather: 'rainy, as always', updated: 1485253977703 },
  'New York': { weather: '38° - but Fahrenheit', updated: 1485253977703 }
}

module.exports = fetch
function fetch (city) {
  return Promise.resolve(weathers[city])
}
