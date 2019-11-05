console.log("hello world");
$(document).ready(function() {

var baseUrl = "http://api.openweathermap.org/data/2.5/"
var state = "california" //change with user input.
var city = "pasadena" //change with user input.
var apiKey = "a059151d000029215400bdaa7965fbc2";
var temp;
var humidity;
var windSpeed;
var uvIndex;

var lat = 34.06; //change with user input
var long = -118.44; //change with user input
var uvUrl = baseUrl + "uvi?" + "lat=" + lat + "&lon=" + long + "&units=imperial&appid=" +  apiKey;
var queryUrl = baseUrl + "weather?" + "q=" + city + "," + state + "&units=imperial&appid=" + apiKey;

var fiveDayForecast; // temperature && humidity only

var forecastUrl = baseUrl + "forecast?" + "q=" + city + "," + state + "&units=imperial&appid=" + apiKey;


// ajax call for current city weather, excluding uv.
$.ajax({
  url: queryUrl,
  method: "GET"
}).then(function(response) {
  console.log(response);
  console.log(response.main.humidity); //humidity
  console.log(response.main.temp); //temp
  console.log(response.wind.speed);
  console.log(response.coord);
  console.log(response.coord.lat);
  console.log(response.coord.lon);
  return response;
});

// ajax call for current uv value. Needs lat/long coordinates (probably from current city weather) in order to work.
$.ajax({
  url: uvUrl,
  method: "GET"
}).then(function(response) {
  console.log(response);
  console.log(response.value); //value of the u.v.
});


// ajax call for five-day weather forecast.
$.ajax({
  url: forecastUrl,
  method: "GET"
}).then(function(response) {
  console.log(response);
})




// temperature
// humidity
// wind speed
// uv index
// 5-day forecast


}); // end of document.ready function. do not delete.