const WEATHER_API_KEY = 'acac732b38e7f8092b4860a695b06937'; // clé API OpenWeatherMap
const ANTANANARIVO_COORDS = {
    lat: -18.8792,
    lon: 47.5079
};

async function getWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${ANTANANARIVO_COORDS.lat}&lon=${ANTANANARIVO_COORDS.lon}&appid=${WEATHER_API_KEY}&units=metric&lang=fr`);
        const data = await response.json();
        
        updateWeatherUI(data);
    } catch (error) {
        console.error('Erreur lors de la récupération de la météo:', error);
        showDefaultWeather();
    }
}

function updateWeatherUI(weatherData) {
    const weatherIcon = document.querySelector('.weather-icon i');
    const temperature = document.querySelector('.temperature');
    const weatherDesc = document.querySelector('.weather-desc');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    // Mise à jour de l'icône
    const iconMapping = {
        '01d': 'sun',
        '01n': 'moon',
        '02d': 'cloud-sun',
        '02n': 'cloud-moon',
        '03d': 'cloud',
        '03n': 'cloud',
        '04d': 'cloud',
        '04n': 'cloud',
        '09d': 'cloud-showers-heavy',
        '09n': 'cloud-showers-heavy',
        '10d': 'cloud-sun-rain',
        '10n': 'cloud-moon-rain',
        '11d': 'bolt',
        '11n': 'bolt',
        '13d': 'snowflake',
        '13n': 'snowflake',
        '50d': 'smog',
        '50n': 'smog'
    };

    const iconCode = weatherData.weather[0].icon;
    weatherIcon.className = `fas fa-${iconMapping[iconCode] || 'sun'}`;

    // Mise à jour des données
    temperature.textContent = `${Math.round(weatherData.main.temp)}°C`;
    weatherDesc.textContent = weatherData.weather[0].description.charAt(0).toUpperCase() + 
                            weatherData.weather[0].description.slice(1);
    humidity.textContent = `Humidité: ${weatherData.main.humidity}%`;
    wind.textContent = `Vent: ${Math.round(weatherData.wind.speed * 3.6)} km/h`; // Conversion de m/s en km/h
}

function showDefaultWeather() {
    const weatherCard = document.querySelector('.current-weather');
    weatherCard.innerHTML = `
        <div class="weather-icon">
            <i class="fas fa-sun"></i>
        </div>
        <h3>Antananarivo</h3>
        <div class="temperature">25°C</div>
        <div class="weather-desc">Ensoleillé</div>
        <div class="weather-details mt-3">
            <div class="detail humidity">
                <i class="fas fa-tint"></i>
                <span>Humidité: 65%</span>
            </div>
            <div class="detail wind">
                <i class="fas fa-wind"></i>
                <span>Vent: 12 km/h</span>
            </div>
        </div>
    `;
}

// Charger la météo au chargement de la page
document.addEventListener('DOMContentLoaded', getWeather);

// Mettre à jour la météo toutes les 30 minutes
setInterval(getWeather, 30 * 60 * 1000);
