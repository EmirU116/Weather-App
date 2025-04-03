function displayHourlyForecast(hourlyData)
{
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);      //why 1000?
        const hour = dateTime.getHours();
        const tempreture = Math.round(item.main.temp - 273.15);
        const IconCode = item.weather[0].icon;
        const IconUrl = `https://openweathermap.org/img/wn/${IconCode}.png`;

        const hourlyItemHTML = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${IconUrl}" alt="Hourly Weather Icon">
                <span>${tempreture}*C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHTML;
    });
}

function displayWeather(data){
    // Creating variables with html elements through id
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyWeatherForecast = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyWeatherForecast.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if(data.cod === '404')
    {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    }
    else
    {
        const cityName = data.name;
        const tempreture = Math.round(data.main.temp - 273.15);     // future research on why 273.15
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const tempretureHTML = `
            <p>${tempreture}*C</p>
        `;

        const weatherHTML = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = tempretureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function getWeather()
{
    const apiKey = process.env.OPENWEATHER_API;
    const city = document.getElementById('city').value;

    // empty input handling 
    if(!city)
    {
        alert("Please enter a city");
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    
    fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
    })
    .catch(error => {
        console.error('Error fetching current weather data: ', error);
        alert('Error fetching current weather data, try again.');
    });

    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
        displayHourlyForecast(data.list);
    })
    .catch(error => {
        console.error('Error fetching hourly forecast data:', error);
        alert("Error fetching hourly forecast data, try again.");
    });
}