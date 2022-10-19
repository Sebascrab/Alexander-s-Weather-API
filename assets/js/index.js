
const searchButton = document.querySelector('.searchButton');
const time = document.getElementById('time');
const date = document.getElementById('date');
const currentWeather = document.getElementById('current-weather-items');
const dayForcast = document.getElementById('weather-forcast');


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
            return data.json()
        } else {
            console.log("error")
        }
    }) .then(function (response) {
        console.log(response)
        fetchDaily(response[0])
        fetchFiveDay(response[0])
    }) 


   
};
searchButton.addEventListener('click', citySearch);


// connecting to current weather api for openweather
 let fetchDaily = function ({lat,lon}) {
     let currentTemp = document.getElementById('current-temp').textContent
     let currentWind = document.getElementById('current-wind-speed').textContent
     let currentHum = document.getElementById('current-humidity').textContent
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`
    fetch(apiUrl).then(function (data) {
        if(data.ok) {
            return data.json()
        } else {
            console.log('error')
        }
    }) .then(function (response) {
        console.log(response)
    })


    
 };


//  connecting to five day forecast api for openweather
 let fetchFiveDay = function ({lat,lon}) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`
    fetch(apiUrl).then(function (data) {
        if(data.ok) {
            return data.json()
        } else {
            console.log('error')
        }
    }) .then(function (response) {
        console.log(response)
    })
    
 };





