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



function formatDay (timestamp) {
let date = new Date (timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[day];

}


//laga til dinne no 05.05.2021 20:55 og 09.05.2021

function displayForecast (response) {
  let forecast = response.data.daily;
 
  let forecastElement = document.querySelector("#forecast");


let forecastHTML= `<div class="row">`;
forecast.forEach (function(forecastDay, index) {
  if (index < 6){
  forecastHTML=
  forecastHTML + 
  `
       <div class="col-2">
          <div class="weather-forecast-date">
       ${formatDay(forecastDay.dt)}
        </div>
<img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="36"/>

<div class="weather-forecast-temperatures">
  <span class="weather-forecast-temperature-max">
${Math.round(forecastDay.temp.max)}° </span>
<span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}° 
</span>
</div>
      </div>

`;
}
})


forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}




//weather conditions (windspeed,temp,humidity)

let apiKey = "5ce87312c228bb7b7cf3354cf2903ed3";
let searchCity = document.querySelector("#enter-city-search");
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=metric`;

//weather conditions (windspeed,temp,humidity)


//HOLDER PÅ HER 09.05.2021

function getForecast(coordinates) {
 let apiKey = "5ce87312c228bb7b7cf3354cf2903ed3";
let apiUrl = 
`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(displayForecast);
}



function showTemperature(response) {
  

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

  let h1= document.querySelector("h1");
  h1.innerHTML = response.data.name;



getForecast(response.data.coord) //må være her pga responsen gir oss coords 

}

axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);





//Function search on load/display default a city

function search (city){
let apiKey = "5ce87312c228bb7b7cf3354cf2903ed3";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
}



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






search("Ålesund");
