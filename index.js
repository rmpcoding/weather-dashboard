$(document).ready(function() {

var baseUrl = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/"
var state = "california" //change with user input.
var city = "pasadena" //change with user input.
var apiKey = "a059151d000029215400bdaa7965fbc2";


var lat = 34.06; //change with user input
var long = -118.44; //change with user input

var queryUrl = baseUrl + "weather?" + "q=" + city + "," + state + "&units=imperial&appid=" + apiKey;
var uvUrl = baseUrl + "uvi?" + "lat=" + lat + "&lon=" + long + "&units=imperial&appid=" +  apiKey;
var forecastUrl = baseUrl + "forecast?" + "q=" + city + "," + state + "&units=imperial&appid=" + apiKey;

// ajax call function for multiple URLs

function ajaxCall(weatherUrl) {
  $.ajax({
    url: weatherUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response)
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
    for (var i = 0; i < data.list.length; i++) {
      console.log(data.list[i])
      var temp = data.list[i].main.temp;
      var date = data.list[i].dt_txt;
      var humidity = data.list[i].main.humidity;
      console.log(date);
      var body = $("body");
      var card = $("<div>").html(
        `<div class="card" style="width: 18rem;">
        <img src="" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${date}</h5>
        <p class="card-text"><h3>${temp + '\n' + humidity}</h3></p>
        </div>
        </div>`
      );
      body.append(card);
    }
    
// date
// icon
// temp
// humidity

  }

}



// there are 8 three-hour cycles per day. 5 * 8 = 40;

}); // end of document.ready function. do not delete.

// for (var i = 0; i < data.length; i++)
// ${imageUrl}
// ${firstName + " " + lastName}
// ${email}
{/* <a href="#" class="btn btn-primary">Go somewhere</a> */}


// {coord: {…}, weather: Array(1), base: "stations", main: {…}, visibility: 11265, …}