function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    // Simulate AJAX call with setTimeout
    setTimeout(() => {
        const weather = weatherData[city];
        
        if (weather) {
            displayWeather(city, weather);
        } else {
            alert('City not found in our database');
        }
    }, 500); // Simulate network delay
}

function displayWeather(city, weather) {
    document.getElementById('cityName').textContent = city;
    document.getElementById('temperature').textContent = weather.temperature;
    document.getElementById('humidity').textContent = weather.humidity;
    document.getElementById('conditions').textContent = weather.conditions;
}

// Add event listener for Enter key
document.getElementById('cityInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
}); 