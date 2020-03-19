$(document).ready(function() {
  // create function on submit even to store text into variable and into local storage.

  var searchButton = document.body.querySelector(".search-input");

  searchButton.addEventListener("keydown", function(enter) {
    if (enter.keyCode === 13) {
      searchButton = searchButton.value;
    } else return;

    var baseUrl =
      "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/";
    var city = searchButton; //change with user input.
    var apiKey = "a059151d000029215400bdaa7965fbc2";

    var lat = 34.06; //change with user input
    var long = -118.44; //change with user input

    // list of icons. More at end of page. Need to work on this as noted at bottom of page.
    var sunIcon = `<i class="fas fa-sun"></i>`;
    var cloudIcon = `<i class="fas fa-cloud"></i>`;

    var queryUrl =
      baseUrl + "weather?" + "q=" + city + "&units=imperial&appid=" + apiKey;
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
      baseUrl + "forecast?" + "q=" + city + "&units=imperial&appid=" + apiKey;

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
        console.log(data.main);
        var temp = data.main.temp;
        var humidity = data.main.humidity;
        var wind = data.wind.speed;
        date = moment(date).format("dddd");

        var currentTempRow = $(".current-temp-row");

        var card = $("<div class='card col-sm-11 card-style-today'>").html(
          `<div class="card-body card-style-today">
          <div class="icon">${sunIcon}</div>
          <h5 class="card-title">${date + "'s Current Weather"}</h5>
          <p class="card-text card-style">
          <h6>Tempurature: ${temp}</h6>
          <h6>Humidity: ${humidity}</h6>
          <h6>Windspeed: ${wind}</h6>
          </p>
          </div>`
        );
        currentTempRow.append(card);
      }

      if (data.list) {
        console.log(data.list);
        // there are 8 three-hour cycles per day, which explains 40 elements in five-day forecast array. Needs to loop differently;
        for (var i = 4; i < data.list.length; i += 8) {
          console.log(data.list[i]);
          var temp = data.list[i].main.temp;
          var date = data.list[i].dt_txt;
          date = moment(date).format("dddd");
          var humidity = data.list[i].main.humidity;
          var body = $("body");
          var cardRow = $(".five-day-row");
          var card = $("<div>").html(
            `<div class="card flex-row" style="width: 10rem;">
            <div class="card-body card-style">
            <div class="icon">${sunIcon}</div>
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
  }); //do not delete. end of search button function.
}); // end of document.ready function. do not delete.

// Next steps:
// Add weather condition logic for icons
// Add state or other indicators to grab data
// setlocalstorage, getlocalstorage to dynamically populate buttons
// Frontend current weather card and five-day forecast cards need to align
// Perhaps get rid of navbar to add jumbotron (aesthetic purposes only)
// Make lat & long dynamic (like the searchButton value var)
// Get rid of decimals in temp/humidity/etc... values via float? or something like that.

// icon reserves below:
// <i class="fas fa-temperature-high"></i>
// <i class="fas fa-cloud-showers-heavy"></i>
// {/* <i class="fas fa-bolt"></i>
// <i class="fas fa-wind"></i>
// <i class="fas fa-cloud"></i> */}

// below is an attept at writing a function to put in logic for the icons.
// function weatherConditions() {
//   if (true === true) {
//     sunIcon;
//   }
//   // else if (condition > 70) {
//   //   cloudIcon;
//   // }
// }
// need to ask T.A.'s about calling function from within a template literal. Can this work? I tried and it didn't, but I feel like it can.
