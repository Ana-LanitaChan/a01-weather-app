//alert("Test app.js");

function displayData(response) {
  //Arrange all the 'lets' first
  let dispHumidity = document.querySelector("#curr-humidity");
  let dispWind = document.querySelector("#curr-wind");
  let dispPrecipitation = document.querySelector("#curr-precipitation");
  let dispClouds = document.querySelector("#curr-clouds");
  let dispTemp = document.querySelector("#temp-number");
  let dispCurrCity = document.querySelector("#curr-city");

  dispHumidity.innerHTML = response.data.main.humidity;
  dispWind.innerHTML = Math.round(response.data.wind.speed * 3.6);
  dispPrecipitation.innerHTML = response.data.rain["1h"];
  dispClouds.innerHTML = response.data.weather[0].description;
  dispTemp.innerHTML = Math.round(response.data.main.temp);
  dispCurrCity.innerHTML = response.data.name;

  console.log(response.data);
}

let apiKey = "492c6e2ddde5d9a8edcbcb2a6951f7b7";
let city = "mexico";
let units = "metric";
let apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

axios.get(apiCall).then(displayData);
