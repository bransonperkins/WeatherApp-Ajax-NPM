// Form's refresh when submit event occurs... this function stops that from happening
$("#weather-form").submit(function(stopRefresh){
    stopRefresh.preventDefault();
});

// Form will get the user's zipcode when submitted
function userEntry() {
    var formInput = $("#zipcode").val();
    $("#weather-form").hide(400);

    currentWeather(formInput);
    // test with console.log
    console.log(formInput);
};

function currentWeather(zipcode) {
    // hide weather until the user enters zipcode
    $("#current-conditions").hide(0);

    // OpenWeather API key
    var key = "ce9d2a49dd53016a147ead212031e836";
    // created a variable that stores unique url depending on what user input I decide to use to call API
    var zipcodeURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + "&appid=" + key;

    // Make API call to OpenWeather
    $.ajax({ url: zipcodeURL, method: "GET"})
        .then(function(weather){

        // Add weather objects
        $(".city").text("City: " + weather.name);
        $(".humidity").text("Humidity: " + weather.main.humidity + "%");
        $(".description").text("Description: " + weather.weather[0].description);

        // moment is now working! - working on having it display the user's local timezone using getTimezoneOffset()
        let timeZone = weather.timeZone;
        let time = moment.tz(timeZone).utcOffset('-0400').format('dddd') + ', ' + moment.tz(timeZone).utcOffset('-0400').format('hh:mm a');
        $(".time").text("Time: " + time);

        // Meters to Miles - this is for the wind speed display
        function milesConvert(meters){
            // calculate meters to miles and display it as a whole number
            var miles = meters * (25 / 11);
            $(".wind").text("Wind: " + Math.round(meters) + "mph");
        };

        // Kelvin to Fahrenheit
        function fahrenheitConvert(kelvin) {
            // calculate kelvin to fahrenheit and display it as a whole number
            var fahrenheit = (kelvin - 273.15) * 1.80 + 32;
            $(".temperature").text("Temperature: " + Math.round(fahrenheit) + "°F");
        };

        function wayTheWindBlows(degrees) {
            var direction = "";
            // determine wind direction
            if (degrees >= 11.25 && degrees <= 33.75) {
                direction = "NNE";
            } else if (degrees >= 33.75 && degrees <= 56.25) {
                direction = "ENE";
            } else if (degrees >= 56.25 && degrees <= 78.75) {
                direction = "E";
            } else if (degrees >= 78.75 && degrees <= 101.25) {
                direction = "ESE";
            } else if (degrees >= 101.25 && degrees <= 123.75) {
                direction = "ESE";
            } else if (degrees >= 123.75 && degrees <= 146.25) {
                direction = "SE";
            } else if (degrees >= 146.25 && degrees <= 168.75) {
                direction = "SSE";
            } else if (degrees >= 168.75 && degrees <= 191.25) {
                direction = "S";
            } else if (degrees >= 191.25 && degrees <= 213.75) {
                direction = "SSW";
            } else if (degrees >= 213.75 && degrees <= 236.25) {
                direction = "SW";
            } else if (degrees >= 236.25 && degrees <= 258.75) {
                direction = "WSW";
            } else if (degrees >= 258.75 && degrees <= 281.25) {
                direction = "W";
            } else if (degrees >= 281.25 && degrees <= 303.75) {
                direction = "WNW";
            } else if (degrees >= 303.75 && degrees <= 326.25) {
                direction = "NW";
            } else if (degrees >= 326.25 && degrees <= 348.75) {
                direction = "NNW";
            } else {
                direction = "N"; 
            }
            //  add wind direction to the speed
            $(".wind").append(" " + direction);
        };

        // couldn't get moment to work - it kept throwing my alert box up.. attempting to fix
        // var moment = require('moment');
        // function currentTime(time){
        //     var time = new Moment();
        //     var timeZone = weather.timezone;
        //     return moment().tz(timeZone).format('hh:mm a');
        // }

        // conversion functions
        milesConvert(weather.wind.speed); 
        fahrenheitConvert(weather.main.temp); 
        wayTheWindBlows(weather.wind.deg);
        // currentTime(moment);

        $("#current-conditions").show(2000);
        console.log(weather);

    }).catch(function(){
        alert("Please enter a valid zip code.")
        console.log("User needs to enter a zip code.")
    });
}