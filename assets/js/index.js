
const searchButton = document.querySelector('.searchButton');
const time = document.getElementById('time');
const date = document.getElementById('date');
const currentWeather = document.getElementById('current-weather-items');
const dayForcast = document.getElementById('weather-forcast');
// const currentTemp = document.getElementById('current-temp');
const currentHumidity = document.getElementById('current-humidity');
const currentWind = document.getElementById('current-wind-speed');

const APIKey = 'f562979073c90c3bd0ad7139ae18e2dd';
// using momentjs for current time, and also date.

function currentDate() {
    let todaysDate = moment().format('MMMM Do, YYYY');
    date.textContent = todaysDate;
}
setInterval(currentDate, 1000);

function currentTime() {
    let todaysTime = moment().format('h:mm a ');
    time.textContent = todaysTime;
}
setInterval(currentTime, 1000);







// connecting to geolocation api for openweather
let citySearch = function (event) {
    let city = document.getElementById('location').value
    let cityAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`
    fetch(cityAPI).then(function (data){
        if (data.ok) {
            console.log('success')  
            return data.json()
        } else {
            console.log("error")
        }
    }) .then(function (response) {
        console.log(response)
    }) 


   
};
searchButton.addEventListener('click', citySearch);












   