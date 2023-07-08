const accessKey = "3PEUCN5zWQFwjg55ZACwDfiPdTKwum_-PnhAbQzQNWM";

const getData = async () => {
  let cityName = document.getElementById('cityName').value
  let countryCode = document.getElementById('countryCode').value
  let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=9238550b15a6a59853b8a3120416c6a1`)
  
  console.log(response)
  return response.data
}

const DOMElements = {
  city: '.city',
  cardHigh: '.card-body-high',
  cardLow: '.card-body-low',
  cardForecast: '.card-body-forecast',
  cardHumidity: '.card-body-humidity',
  cityImage: '#cityImage'
}

const loadData = async () => {
  const weatherData = await getData();
  let tempMax = ((weatherData.main.temp_max) - 273.15) * (9 / 5) + 32
  let tempMin = ((weatherData.main.temp_min) - 273.15) * (9 / 5) + 32

  document.querySelector(DOMElements.city).innerHTML = `${weatherData.name}`
  document.querySelector(DOMElements.cardHigh).innerHTML = `${tempMax.toFixed(1)} F`
  document.querySelector(DOMElements.cardLow).innerHTML = `${tempMin.toFixed(1)} F`
  document.querySelector(DOMElements.cardForecast).innerHTML = `${weatherData.weather[0].description}`
  document.querySelector(DOMElements.cardHumidity).innerHTML = `${weatherData.main.humidity}%`

  const cityName = encodeURIComponent(weatherData.name)
  const imageResponse = await axios.get(`https://api.unsplash.com/photos/random?query=${cityName}&client_id=${accessKey}`)
  const imageUrl = imageResponse.data.urls.regular

  document.querySelector(DOMElements.cityImage).src = imageUrl
};

const clearData = () => {
  document.querySelector(DOMElements.city).innerHTML = ''
  document.querySelector(DOMElements.cardHigh).innerHTML = ''
  document.querySelector(DOMElements.cardLow).innerHTML = ''
  document.querySelector(DOMElements.cardForecast).innerHTML = ''
  document.querySelector(DOMElements.cardHumidity).innerHTML = ''
  document.querySelector(DOMElements.cityImage).src = ''
}
