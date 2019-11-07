$(document).ready(function() {

// create function on submit even to store text into variable and into local storage. 

  var searchButton = document.body.querySelector(".search-input")
  console.log(searchButton);
  
  searchButton.addEventListener("keydown", function(enter) {
    if (enter.keyCode === 13) {
      console.log(searchButton.value);
    }
  });

  console.log(searchButton);

  var baseUrl =
    "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/";
  var state = "california"; //change with user input.
  var city = "pasadena"; //change with user input.
  var apiKey = "a059151d000029215400bdaa7965fbc2";
  console.log(city);

  var lat = 34.06; //change with user input
  var long = -118.44; //change with user input

  var queryUrl =
    baseUrl +
    "weather?" +
    "q=" +
    city +
    "," +
    state +
    "&units=imperial&appid=" +
    apiKey;
  var uvUrl =
    baseUrl +
    "uvi?" +
    "lat=" +
    lat +
    "&lon=" +
    long +
    "&units=imperial&appid=" +
    apiKey;
  var forecastUrl =
    baseUrl +
    "forecast?" +
    "q=" +
    city +
    "," +
    state +
    "&units=imperial&appid=" +
    apiKey;

    console.log(queryUrl);
  // ajax call function for multiple URLs

  function ajaxCall(weatherUrl) {
    $.ajax({
      url: weatherUrl,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      generator(response);
    });
  }

  ajaxCall(queryUrl);
  ajaxCall(forecastUrl);
  ajaxCall(uvUrl);

  function generator(data) {
    if (data.coord) {
      var lat = data.coord.lat;
      var long = data.coord.lon;
      console.log(lat);
      console.log(long);
    }

    if (data.main) {
      var temp = data.main.temp;
      var humidity = data.main.humidity;
      var wind = data.wind.speed;

      console.log(temp);
      console.log(humidity);
      console.log(wind);
    }

    if (data.list) {
      console.log(data.list);
      // var temp = data.main.temp;
      // var humidity = data.main.humidity;
      for (var i = 4; i < data.list.length; i += 8) {
        console.log(data.list[i]);
        var temp = data.list[i].main.temp;
        var date = data.list[i].dt_txt;
        date = moment(date).format('dddd');
        var humidity = data.list[i].main.humidity;
        var body = $("body");
        var cardRow = $(".five-day-row");
        var icon = `<i class="fas fa-temperature-high"></i>`
        var card = $("<div>").html(
          `<div class="card flex-row" style="width: 10rem;">
        <div class="card-body card-style">
        ${icon}
        <h5 class="card-title">${date}</h5>
        <p class="card-text card-style">
          <h6>Tempurature: ${temp}</h6>
          <h6>Humidity: ${humidity}</h6>
        </p>
        </div>
        </div>`
        );
        cardRow.append(card);
      } //do not delete
    } //do not delete
  } //do not delete

}); // end of document.ready function. do not delete.

// for (var i = 0; i < data.length; i++)
// ${imageUrl}
// ${firstName + " " + lastName}
// ${email}
// {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}

// {coord: {…}, weather: Array(1), base: "stations", main: {…}, visibility: 11265, …}

// {/* <i class="fas fa-bolt"></i>
// <i class="fas fa-sun"></i>
// <i class="fas fa-cloud-showers-heavy"></i>
// <i class="fas fa-wind"></i>
// <i class="fas fa-cloud"></i> */}

  // there are 8 three-hour cycles per day. 5 * 8 = 40;
  // <i class="fas fa-temperature-high"></i>