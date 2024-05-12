import React, { useState } from 'react';

const Weather = () => {
    const [city, setCity] = useState("Rajkot");
    const [weatherData, setWeatherData] = useState(null);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleButtonClick = async () => {
        try {
            const response = await fetch(`https://api.api-ninjas.com/v1/weather?city=${city}`, {
                method: 'GET',
                headers : {
                    "X-Api-Key" : "BucmzcH5Yz3+B4UBPO/60w==i18haY5889vM5pjJ"
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const rawResponse = await response.text();
            console.log('Raw Response:', rawResponse);

            const data = JSON.parse(rawResponse);
            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div>
            <select value={city} onChange={handleCityChange}>
                <option value="Rajkot">Rajkot</option>
                <option value="Kolki">Kolki</option>
                <option value="Dhrol">Dhrol</option>
                <option value="Surat">Surat</option>
                <option value="Vadodara">Vadodara</option>
            </select>
            <button onClick={handleButtonClick}>Get Weather</button>

            {weatherData && (
                <div>
                    <h2>Weather Information for {city}</h2>
                    <p>Wind Speed: {weatherData.wind_speed}</p>
                    <p>Wind Degrees: {weatherData.wind_degrees}</p>
                    <p>Temperature: {weatherData.temp}</p>
                    <p>Humidity: {weatherData.humidity}</p>
                    <p>Sunset: {new Date(weatherData.sunset * 1000).toLocaleTimeString()}</p>
                    <p>Min Temperature: {weatherData.min_temp}</p>
                    <p>Cloud Percentage: {weatherData.cloud_pct}</p>
                    <p>Feels Like: {weatherData.feels_like}</p>
                    <p>Sunrise: {new Date(weatherData.sunrise * 1000).toLocaleTimeString()}</p>
                    <p>Max Temperature: {weatherData.max_temp}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
