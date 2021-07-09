// Weather DashBoard Homework-6 By Tanvir Hossain


var searchButton = $("#searchBtn");

var apiKey = "59b8a8c405ff8423f99a6f8cdaf39e42";

// Loop to keep saved cities in a list on HTML

for (var i=0; i< localStorage.length; i++) {

    var city = localStorage.getItem(i);

    console.log(localStorage.getItem("city"));

    var cityName = $(".list-cities").addClass("list-group-item")

    cityName.append("<li>" + city + "</li>");


}

// Key Count for local storage 

var keyCount = 0;

// On click event for search button

searchButton.click(function () {

    var searchInput = $("#searchInput").val();

// Variables for current weather

    var apiCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=metric";

//Variables for 5 day forecast

    var apiFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=metric";