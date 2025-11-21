import './style/main.css';
import axios from "axios";

const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key
const inputForm = document.querySelector('.inputForm');
const cityInput = document.querySelector('.cityInput');
const weatherCard = document.querySelector('.card'); 

inputForm.addEventListener('submit', async (event) => { 
    event.preventDefault(); // this line prevents the form from submitting in the traditional way, meaning the page won't reload
    weatherCard.innerHTML = '';

    const city = cityInput.value.toLowerCase(); 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    if (!city) return displayError('Please enter a city name.');

    try {
        const response = await axios.get(apiUrl);
  
        const data = response.data;  
        const [city, temp, humid, weatherdescription, weatherId] = [data.name, Math.round(data.main.temp), data.main.humidity, data.weather[0].description, data.weather[0].id];   
 
        const cityName = document.createElement('h1');
        cityName.classList.add('cityName');
        cityName.textContent = city; 
        weatherCard.appendChild(cityName);

        const temperature = document.createElement('p');
        temperature.classList.add('temp');
        temperature.textContent = `${temp}°C`; 
        weatherCard.appendChild(temperature);

        const humidity = document.createElement('p');
        humidity.classList.add('humidity');
        humidity.textContent = `Humidity: ${humid}%`; 
        weatherCard.appendChild(humidity);

        const weatherDesp = document.createElement('p');
        weatherDesp.classList.add('weatherDesp');
        weatherDesp.textContent = weatherdescription; 
        weatherCard.appendChild(weatherDesp);  

        const weatherEmj = document.createElement('p');
        weatherEmj.classList.add('weatherEmoji');
        weatherEmj.textContent = weatherEmoji(weatherId); 
        weatherCard.appendChild(weatherEmj);  
    } catch (error) {
        console.error('Fetch error:', error); 
        displayError('Failed to get weather data. Please check the city name and your internet connection.')
    }
    
    
    cityInput.value = '';
})

function displayError(message) {
    const errorMessage = document.createElement('h1');
    errorMessage.classList.add('errorMessage');
    errorMessage.textContent = message; 
    weatherCard.appendChild(errorMessage);
}

function weatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId <= 232):
            return '⛈️'; // Thunderstorm 
        case (weatherId >= 300 && weatherId <= 321): 
            return '🌧️'; // Drizzle
        case (weatherId >= 500 && weatherId <= 531): 
            return '🌧️'; // Rain
        case (weatherId >= 600 && weatherId <= 622):
            return '❄️'; // Snow
        case (weatherId >= 701 && weatherId <= 781):
            return '🌫️';
        case (weatherId === 800):
            return '☀️'; // Clear
        case (weatherId >= 801 && weatherId <= 804):
            return '☁️'; // Clouds
    
        default:
            break;
    }
}

 