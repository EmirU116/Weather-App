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
    
}