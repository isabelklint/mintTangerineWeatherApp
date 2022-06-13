const axios = require("axios").default;

// SET TIME
let now = new Date();
let min = now.getMinutes();

let dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let dayName = dayNames[now.getDay()];

var span = document.querySelector("#showTime");

if (min < 10) {
  min = `0${min}`;
  let hr = now.getHours();
  let timeNow = `${hr}:${min}`;
  span.innerHTML = `${dayName} ${timeNow}`;
} else {
  let hr = now.getHours();
  let timeNow = `${hr}:${min}`;
  span.innerHTML = `${dayName} ${timeNow}`;
}

// CITY NAME

// SET CITY NAME FROM SEARCH BAR INPUT
//function setCityNameAction(event) {
// event.preventDefault();
// let input = document.querySelector("#searchbar");
// var cityUpper = input.value.toLocaleUpperCase();
//  document.getElementById("cityName").innerHTML = `${cityUpper}`;
//}

let form = document.querySelector("form");
//form.addEventListener("submit", setCityNameAction);
form.addEventListener("submit", getITemp);

// SET CITY NAME FROM CURRENT LOCATION BUTTON
// IGNORE ERROR 'REQUIRE IS NOT DEFINED'
var location_button = document.querySelector("#location_button");
location_button.addEventListener("click", getCityNameAction);
location_button.addEventListener("click", getLTemp);

function getCityNameAction(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
  document.getElementById("searchbar").value = "";
}

function showCurrentLocation(response) {
  let myCity = document.querySelector("#cityName");
  //myCity.innerHTML = response.data[0].name;
  myCity.innerHTML = `${response.data.name}`;
}

function showPosition(position) {
  let apiKey = "af299e40c9c7667df5a6bc3d09004719";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showCurrentLocation);
}

// SET L TEMP
function getLTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeatherFromLocation);
}

function showTemperature(response) {
  document.getElementById("fTemp").innerHTML =
    Math.round(response.data.main.temp) + "°f";
  document.getElementById("cTemp").innerHTML =
    Math.round((response.data.main.temp - 32) / 1.8) + "°c";

  document.getElementById("cityName").innerHTML = `${response.data.name}`;
}

function getWeatherFromLocation(position) {
  let apiKey = "af299e40c9c7667df5a6bc3d09004719";
  let units = "imperial";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

// SET I TEMP
function getITemp(event) {
  event.preventDefault();
  event.preventDefault();
  let apiKey = "af299e40c9c7667df5a6bc3d09004719";
  let units = "imperial";
  let city = document.querySelector("#searchbar");
  var cityLower = city.value.toLocaleLowerCase();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityLower}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
