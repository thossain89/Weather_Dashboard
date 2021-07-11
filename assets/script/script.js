// Weather DashBoard Homework-6 By Tanvir Hossain


var cityList = [];;

var apiKey = "59b8a8c405ff8423f99a6f8cdaf39e42";

//Storing city list in local storage

function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cityList));
}

// Add latest search to the list

function createCityList(){
    $(".list-cities").empty();
    list-cities.forEach(function(city) {
        $(".list-cities").prepend($(`<button class="list-group-item list-group-item-action cityButton" data-city="${city}">${city}</button>`));
    })
}

// Loads city list and on click it calls api for that specific city

function init() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));

    if (storedCities !== null) {
        cityList = storedCities;
    }

    createCityList();

    if (cityList) {
        var thisCity = cityList[cityList.length - 1]
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
        getUVI(id, cityLat, cityLong);
    })

}

// Button to clear the city list from local storage

var clear = document.querySelector("#clearCities");

clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
