$(document).ready(function() {
    // create function on submit even to store text into variable and into local storage.

    var searchButton = document.body.querySelector('.search-input');

    searchButton.addEventListener('keydown', function(enter) {
        if (enter.keyCode === 13) {
            searchButton = searchButton.value;
        } else return;




        // UNDER CONSTRUCTION FOR LOCAL STORAGE PURPOSES
        // =======================================================
        let resultsArr = JSON.parse(localStorage.getItem('city'));
        resultsArr = resultsArr ? resultsArr : [];
        console.log(resultsArr);
        resultsArr.push(searchButton);
        console.log(resultsArr);
        localStorage.setItem('city', JSON.stringify(resultsArr))

        var buttonRow = $('.search-field');
        var button = $(
            `<button type="button" class="btn btn-light btn-sm mt-3">`
        ).html(JSON.parse(localStorage.getItem('city')));

        buttonRow.append(button);
        // =======================================================
        // UNDER CONSTRUCTION FOR LOCAL STORAGE PURPOSES



        
        var baseUrl =
            'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/';
        var apiKey = 'a059151d000029215400bdaa7965fbc2';
        var city = searchButton;
        var lat;
        var long;

        var locationUrl = `${baseUrl}weather?q=${city}&units=imperial&appid=${apiKey}`;
        var uvUrl = `${baseUrl}uvi?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`;
        var forecastUrl = `${baseUrl}forecast?q=${city}&units=imperial&appid=${apiKey}`;
        var hourlyUrl = `${baseUrl}forecast/hourly?q=${city}&units=imperial&appid=${apiKey}`;

        function ajaxCall(weatherApiCall) {
            $.ajax({
                url: weatherApiCall,
                method: 'GET'
            }).then(function(response) {
                generator(response);
            });
        }

        ajaxCall(locationUrl);
        ajaxCall(forecastUrl);
        ajaxCall(uvUrl);
        ajaxCall(hourlyUrl);

        function generator(data) {
            let iconUrl;

            if (data.weather) {
                var icon = data.weather[0].icon;
                iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            }
            if (data.coord) {
                lat = data.coord.lat;
                long = data.coord.lon;
            }
            if (data.main) {
                var temp = Math.floor(data.main.temp);
                var humidity = data.main.humidity;
                var wind = data.wind.speed;
                var currentTempRow = $('.current-temp-row');
                date = moment(date).format('dddd');
                var card = $(
                    `<div class='card col-sm-11 card-style-today'>`
                ).html(
                    `<div class="card-body card-style-today">
                    <img src="${iconUrl}"/>
                    <h5 class="card-title">${date}'s Current Weather</h5>
                    <p class="card-text card-style">
                    <h6>Tempurature: ${temp}&deg</h6>
                    <h6>Humidity: ${humidity}%</h6>
                    <h6>Windspeed: ${wind}mph</h6>
                    </p>
                    </div>`
                );
                currentTempRow.append(card);
            }
            if (data.list) {
                for (var i = 4; i < data.list.length; i += 8) {
                    var fiveDayIcons = data.list[i].weather[0].icon;
                    fiveDayIconUrl = `http://openweathermap.org/img/wn/${fiveDayIcons}@2x.png`;
                    var temp = data.list[i].main.temp;
                    var date = data.list[i].dt_txt;
                    date = moment(date).format('dddd');
                    var humidity = data.list[i].main.humidity;
                    var body = $('body');
                    var cardRow = $('.five-day-row');
                    var card = $('<div>').html(
                        `<div class="card flex-row" style="width: 10rem;">
                        <div class="card-body card-style">
                        <img src="${fiveDayIconUrl}"/>
                        <h5 class="card-title">${date}</h5>
                        <p class="card-text card-style">
                        <h6>Tempurature: ${temp}&deg</h6>
                        <h6>Humidity: ${humidity}%</h6>
                        </p>
                        </div>
                        </div>`
                    );
                    cardRow.append(card);
                }
            }
        }
    });
});

// there are 8 three-hour cycles per day, which explains 40 elements in five-day forecast array. Needs to loop differently;
// var i = five days (4); adds 8 (3-hour cycles) to loop five times, or five days.

// Next steps:
// setlocalstorage, getlocalstorage to dynamically append buttons on left
// UV index
// aesthetics
