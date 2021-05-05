// Display current date and time

let h3 = document.querySelector("h3");

let h4 = document.querySelector("h4");

let now = new Date();

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let secounds = now.getSeconds();
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let months = [
  "jan",
  "feb",
  "march",
  "april",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec"
];

let month = months[now.getMonth()];

if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

if (secounds < 10) {
  secounds = `0${secounds}`;
}
h3.innerHTML = `${hours}:${minutes}:${secounds}`;
h4.innerHTML = `${day} ${date}. ${month}`;






//laga til dinne no 05.05.2021 20:55

function displayForecast () {
  let forecastElement = document.querySelector("#forecast");


let forecastHTML= `<div class="row">`;

let days =["Wed", "Thu", "Fri"]
days.forEach (function(day) {
  forecastHTML=
  forecastHTML + 
  `
       <div class="col-2">
          <div class="weather-forecast-date">
       ${day}
        </div>
<img src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png" alt="" width="36"/>

<div class="weather-forecast-temperatures">
  <span class="weather-forecast-temperature-max">
18° </span>
<span class="weather-forecast-temperature-min">12° 
</span>
</div>
      </div>

`;

})


forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}










//weather conditions (windspeed,temp,humidity)

let apiKey = "5ce87312c228bb7b7cf3354cf2903ed3";
let searchCity = document.querySelector("#enter-city-search");
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=metric`;

//weather conditions (windspeed,temp,humidity)

function showTemperature(response) {
  console.log(response.data);

  let temperature = Math.round(response.data.main.temp);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;

  let temperatureElement = document.querySelector("#temperatureShown");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");


  temperatureElement.innerHTML = `${temperature}°C`;
  descriptionElement.innerHTML = `${description}`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${wind} km/h`;
}

axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

//Function search on load/display default a city

//function search (city){
//let apiKey = "5ce87312c228bb7b7cf3354cf2903ed3";
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
//axios.get(apiUrl).then(showTemperature);
//}

//search("Alicante");

//Display city/place in h1 (endra den fra search til handleSumbit etter videoen)

function handleSubmit(event) {
  event.preventDefault();
  let apiKey = "5ce87312c228bb7b7cf3354cf2903ed3";
  let searchCity = document.querySelector("#enter-city-search");

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchCity.value}`;
}

let cityInput = document.querySelector("#city-input");
cityInput.addEventListener("click", handleSubmit);

//Search location:

function searchLocation(position) {
  let apiKey = "5ce87312c228bb7b7cf3354cf2903ed3";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

//change °C to °F (fake data)

function changeCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperatureShown");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `-2°C`;
}

function changeFarenheit(event) {
  event.preventDefault();
  let temperatureShown = document.querySelector("#temperatureShown");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `28°F`;
}

let celciusButton = document.querySelector("#celcius-button");
celciusButton.addEventListener("click", changeCelcius);

let farenheitButton = document.querySelector("#farenheit-button");
farenheitButton.addEventListener("click", changeFarenheit);



displayForecast();