const apiKey = "e8d6cee9eb33984b9d289e86a52c2882";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('input');
const searchBtn = document.querySelector('button');
let weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
        document.querySelector('main').style.height = 'fit-content';
    } else {
        var data = await response.json();

        console.log(data)
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + "km/h"; 

        if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = 'clouds.png';
        } else if(data.weather[0].main == 'Clear'){
            weatherIcon.src = 'clear.png';
        } else if(data.weather[0].main == 'Rain'){
            weatherIcon.src = 'Rain.png';
        } else if(data.weather[0].main == 'Drizzle'){
            weatherIcon.src = 'drizzle.png';
        } else if(data.weather[0].main == 'Mist'){
            weatherIcon.src = 'Mist.png';
        } 

        document.querySelector('.weather').style.display = 'block'; 
        document.querySelector('main').style.height = '23rem';
        document.querySelector('.error').style.display = 'none';
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})
