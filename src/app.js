//alert("Test app.js");

function formatDate(timedt) {
  //calculate date
  let currDate = new Date(timedt);
  let weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currDay = weekDay[currDate.getDay()];
  let currHour = currDate.getHours();
  let currMinutes = currDate.getMinutes();
  if (currMinutes < 10) {
    currMinutes = `0${currMinutes}`;
  }

  return `${currDay} ${currHour}:${currMinutes} hrs.`;
}

function formatDay(daydt) {
  let date = new Date(daydt * 1000);
  eachDay = date.getDay();
  let forecastWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return forecastWeek[eachDay];
}

function displayForecast(response02) {
  let forecast = response02.data.daily;
  let displayWhole = document.querySelector("#concatenated-forecast");

  let foreColumnHTML = "";
  /*Function inside a function inside aaah @___@*/
  forecast.forEach(function (daily, index) {
    if (index < 5) {
      foreColumnHTML =
        foreColumnHTML +
        `<div class="col-2">
    <p class="fore-day">${formatDay(daily.dt)}</p>
      <img
          class="fore-ico"
          src="https://openweathermap.org/img/wn/${
            daily.weather[0].icon
          }@2x.png"
          alt="..."
        />
    <p class="fore-temp"> <span class="max">${Math.round(
      daily.temp.max
    )}°</span> | <span>${Math.round(daily.temp.min)}°</span></p>
   </div>
  
  `;
    }
  });

  displayWhole.innerHTML = foreColumnHTML;

  console.log(forecast);
}

/*This function extract the coords from 'DisplayData',
because this one received the response whith this info.*/

function apiCallForecast(coord) {
  let units = "metric";
  let lat = coord.lat;
  let lon = coord.lon;
  let apiKey = "492c6e2ddde5d9a8edcbcb2a6951f7b7";
  let apiCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(apiCall).then(displayForecast);
}

//This function is for selecting from HTML and displaying a response.
function displayData(response) {
  //Arrange all the 'lets' first
  let dispHumidity = document.querySelector("#curr-humidity");
  let dispWind = document.querySelector("#curr-wind");
  let dispClouds = document.querySelector("#curr-clouds");
  let dispTemp = document.querySelector("#temp-number");
  let dispCurrCity = document.querySelector("#curr-city");
  let dispDate = document.querySelector("#curr-date");
  let dispImg = document.querySelector("#curr-img");
  let dispCurrTemp = Math.round(response.data.main.temp);

  dispHumidity.innerHTML = response.data.main.humidity;
  dispWind.innerHTML = Math.round(response.data.wind.speed * 3.6);
  dispClouds.innerHTML = response.data.weather[0].description;
  dispTemp.innerHTML = dispCurrTemp;
  dispCurrCity.innerHTML = response.data.name;
  dispDate.innerHTML = formatDate(response.data.dt * 1000);
  dispImg.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  dispImg.setAttribute("alt", `${response.data.weather[0].description}`);

  //Call the coordenates for daily forecast FROM HERE:
  apiCallForecast(response.data.coord);
}

function apiCallCity(city) {
  let units = "metric";
  let apiKey = "492c6e2ddde5d9a8edcbcb2a6951f7b7";
  let apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiCall).then(displayData);
}

function defaultInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#input-search");
  let city = cityInput.value;
  city.trim();
  apiCallCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", apiCallCity);

//Default input:
apiCallCity("Tlalnepantla");
