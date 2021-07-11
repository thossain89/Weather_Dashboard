// Weather DashBoard Homework-6 By Tanvir Hossain


var listCities = [];;

var apiKey = "59b8a8c405ff8423f99a6f8cdaf39e42";

//Storing city list in local storage

function storeCities() {
    localStorage.setItem("cities", JSON.stringify(listCities));
}

// Add latest search to the list

function createCityList(){
    $(".listCities").empty();
    listCities.forEach(function(city) {
        $(".listCities").prepend($(`<button class="list-group-item list-group-item-action cityButton" data-city="${city}">${city}</button>`));
    })
}

// Loads city list and on click it calls api for that specific city

function init() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));

    if (storedCities !== null) {
        listCities = storedCities;
    }

    createCityList();

    if (listCities) {
        var thisCity = listCities[listCities.length - 1]
        getCurrentWeather(thisCity, apiKey);
        getForecast(thisCity, apiKey);
    }
}

//Api call for current searched city and getting data for UV index

function getCurrentWeather(thisCity, apiKey) {
    var currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${thisCity}&units=metric&appid=${apiKey}`;
    var cityLat;
    var cityLong;

    $.ajax({
        url: currentURL,
        method: "GET"
    }).then(function (data) {
        $(".cityCurrent").append(
            `<div class="row ml-1">
                <h3 class="mr-3">${data.name} (${(new Date(1000 * data.dt).getUTCDate()) - 1}/${(new Date(1000 * data.dt).getUTCMonth()) + 1}/${new Date(1000 * data.dt).getUTCFullYear()})</h3>
                <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
            </div>`
        )
        $(".cityCurrent").append(`<p>Temperature: ${data.main.temp} &degC</p>`)
        $(".cityCurrent").append(`<p>Humidity: ${data.main.humidity} %</p>`)
        $(".cityCurrent").append(`<p>Wind: ${data.wind.speed} Kph</p>`)
        cityLat = data.coord.lat;
        cityLong = data.coord.lon;
        getUVI(apiKey, cityLat, cityLong);
    })

}

//  To get uv index for selected city in getCurrentWeather

function getUVI(apiKey, cityLat, cityLong) {
    var uvURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${cityLat}&lon=${cityLong}&appid=${apiKey}`;

    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function (data) {
        $(".cityCurrent").append(`<p>UV Index: <span class="badge badge-danger p-2">${data.value}</span></p>`);
    })
}

// 5 day forecast for the current city


function getForecast(thisCity, apiKey) {
    
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${thisCity}&units=metric&appid=${apiKey}`;

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (data) {
        
        for (i = 0; i < data.list.length; i++) {
            if (data.list[i].dt_txt.search("18:00:00") != -1) {
                var forecastDate = data.list[i];
                $(".forecast").append(
                    `<div class="card bg-primary shadow m-4">
                        <div class="card-body">
                            <h4 class="card-title">${new Date(1000 * forecastDate.dt).getUTCDate()}/${(new Date(1000 * forecastDate.dt).getUTCMonth()) + 1}/${new Date(1000 * forecastDate.dt).getUTCFullYear()}</h4>
                            <div class="card-text">
                                <img src="http://openweathermap.org/img/w/${forecastDate.weather[0].icon}.png">
                                <p class="card-text">Temp: ${forecastDate.main.temp} &degC</p>
                                <p class="card-text">Humidity: ${forecastDate.main.humidity} %</p>
                            </div>
                        </div>
                    </div>`
                );
            }
        }

    })
}

// Function that calls current and 5-day forecasts for city

function displayCityWeather() {
    var thisCity = $(this).attr("data-city");

    $(".cityCurrent").empty();
    getCurrentWeather(thisCity, apiKey);

    $(".forecast").empty();
    getForecast(thisCity, apiKey);
    
}

// Calls stored cities function on load

init()

// Search input 

$("form").on("submit", function(event) {
    event.preventDefault();
    var newCity = $("#citySearch").val().trim();
    listCities.push(newCity);
    createCityList();
    storeCities();
    $("#citySearch").val("");
})

// On click function to view results

$(".listCities").on("click", ".cityButton", displayCityWeather);


// Button to clear the city list from local storage

var clear = document.querySelector("#clearCities");

clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
