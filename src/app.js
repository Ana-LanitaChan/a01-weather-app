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

function displayForecast(response02) {
  console.log(response02);

  let displayWhole = document.querySelector("#concatenated-forecast");

  let foreColumnHTML = "";
  let foreDays = ["Sun", "Mon", "Tue", "Wed", "Thu"];

  /*Function inside a function inside a @___@*/
  foreDays.forEach(function (day) {
    foreColumnHTML =
      foreColumnHTML +
      `<div class="col-2">
    <p class="fore-day">${day}</p>
      <img
          class="fore-ico"
          src="https://openweathermap.org/img/wn/02n@2x.png"
          alt="..."
        />
    <p class="fore-temp"> <span class="max">00°</span> | <span>00°</span></p>
   </div>
  
  `;
  });

  displayWhole.innerHTML = foreColumnHTML;
}

displayForecast();

/*This function extract the coords from 'DisplayData',
because this one receivend the response whith this info.*/

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
  //let dispPrecipitation = document.querySelector("#curr-precipitation");
  window.value = Math.round(response.data.main.temp);

  dispHumidity.innerHTML = response.data.main.humidity;
  dispWind.innerHTML = Math.round(response.data.wind.speed * 3.6);
  dispClouds.innerHTML = response.data.weather[0].description;
  dispTemp.innerHTML = window.value;
  dispCurrCity.innerHTML = response.data.name;
  dispDate.innerHTML = formatDate(response.data.dt * 1000);
  dispImg.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  dispImg.setAttribute("alt", `${response.data.weather[0].description}`);
  //dispPrecipitation.innerHTML = response.data.rain["1h"];

  console.log(response.data);

  //Call the coordenates for daily forecast FROM HERE:
  apiCallForecast(response.data.coord);
}

function apiCallCity(trigger) {
  trigger.preventDefault();
  let cityInput = document.querySelector("#input-search");
  let city = cityInput.value;
  city.trim();

  let units = "metric";
  let apiKey = "492c6e2ddde5d9a8edcbcb2a6951f7b7";
  let apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiCall).then(displayData);
}

function displayFarhen(click) {
  click.preventDefault();
  let farhenConversion = Math.round((window.value * 9) / 5 + 32);
  let tempFarhen = document.querySelector("#temp-number");
  tempFarhen.innerHTML = farhenConversion;
  //swap class
  let activeFarhen = document.querySelector("#farhen");
  activeFarhen.classList.add("units-active");

  let offCelsius = document.querySelector("#celsius");
  offCelsius.classList.remove("units-active");
}

function displayCelisius(click) {
  click.preventDefault();

  if (window.value == undefined) {
    window.value = "(´꒳`)";
  }
  let tempCelsius = document.querySelector("#temp-number");
  tempCelsius.innerHTML = window.value;
  //swap class
  let activeCelsius = document.querySelector("#celsius");
  activeCelsius.classList.add("units-active");

  let offFarhen = document.querySelector("#farhen");
  offFarhen.classList.remove("units-active");
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", apiCallCity);

let farhenLink = document.querySelector("#farhen");
farhenLink.addEventListener("click", displayFarhen);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelisius);
