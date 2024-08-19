function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  temperatureElement.innerHTML = `${Math.round(temperature)}°C`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;

getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "1843efb9843b3td6fda2508ae114e9o4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

return days[date.getDay()];
}

function getForecast(city) {
let apiKey = "1843efb9843b3td6fda2508ae114e9o4";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);

}
 
function displayForecast(response) {
let forecastHtml = "";

response.data.daily.forEach(function (day, index) {
    if (index < 6) {
    forecastHtml =
      forecastHtml +
      `
    <div class="day-card">
      <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
      <h3 class="weather-forecast-date">${formatDay(day.time)}</h3>
      <div class="weather-forecast-temperatures">
        <p class="weather-forecast-temperature">
          <strong>${Math.round(day.temperature.maximum)}º</strong>
        </p>
       <p class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}º</p>
      </div>
      <p class="description">${day.condition.description}</p>
    </div>;
`;
}
});


 let forecastElement = document.querySelector("#forecast");
 forecastElement.innerHTML = forecastHtml;
 }

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
