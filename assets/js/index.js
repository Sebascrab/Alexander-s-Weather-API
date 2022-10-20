const previousSearch = document.querySelector('.previousSearch');
const searchButton = document.querySelector('.searchButton');
const time = document.getElementById('time');
const date = document.getElementById('date');
const currentWeather = document.getElementById('current-weather-items');
const dayForcast = document.getElementById('weather-forcast');
const currentCity = document.getElementById('currentCity');
const futureForecast = document.getElementById('futureForecast');
const currentWeatherIcon = document.getElementById('currentWeatherIcon')



const APIKey = 'c51001d07a06e635ebd124822da632c2';
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
const citySearch = function (event) {

    // save search to local storage
    let city = document.getElementById('location').value;
    let towns = JSON.parse(localStorage.getItem('towns',)) || [];
    towns.push(city);
    localStorage.setItem("towns", JSON.stringify(towns));
    towns.forEach(city => createCityEl(city));

    

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
     let currentTemp = document.getElementById('current-temp')
     let currentWind = document.getElementById('current-wind-speed')
     let currentHum = document.getElementById('current-humidity')
     let currentCity = document.getElementById('currentCity')
    //  let currentDayIcon = document.getElementById('currentWeatherIcon')
    
    

    

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`
    fetch(apiUrl).then(function (data) {
        if(data.ok) {
            return data.json()
        } else {
            console.log('error')
        }
    }) .then(function (response) {
        console.log(response)

        // taking data from response for current city, temprature, humidity, and wind speed
        currentTemp.textContent = Math.floor(response.main.temp) + `\u00B0 F ` 
        currentHum.textContent = Math.floor(response.main.humidity) + `%`
        currentWind.textContent = Math.floor(response.wind.speed) + ` MPH`
        currentCity.textContent = response.name
        

        
            
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

    // Five Day Forecast

    // function fiveDay(future) {
    //     let beginingDay = 
    // }
    
 };

 




// appends list of cities from past searches
let createCityEl = (city) => {
    let cityDiv = document.createElement('div');
    let cityNameBtn = document.createElement('button');

    cityNameBtn.innerText = 'City: ' + city;

    cityDiv.append(cityNameBtn);
    previousSearch.appendChild(cityDiv);
    // cityNameBtnBtn.addEventListener('click', citySearch)
};

