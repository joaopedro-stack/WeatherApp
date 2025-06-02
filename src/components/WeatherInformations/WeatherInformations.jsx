import './WeatherInformations.css'
import HourNow from "../HourNow/HourNow.jsx";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);
function WeatherInformations({ weather }) {
    return (
        <div className='weather-container'>
            <h2 className='temperature'>{Math.round(weather.main.temp)}°</h2>
            <div className="weather-info">
                <div className="weather-img">
                    <div className="weather-name">
                        <h3>{weather.name}</h3>
                        <HourNow />
                        <h3>{weather.weather[0].description}</h3>
                    </div>
                    <div className="img">
                        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />
                    </div>
                </div>
                <div className='details'>
                    <p><FontAwesomeIcon icon="fa-solid fa-wind" /> {weather.wind.speed}</p>
                    <p><FontAwesomeIcon icon="fa-solid fa-temperature-half" /> {Math.round(weather.main.feels_like)}°C</p>
                    <p><FontAwesomeIcon icon="fa-solid fa-droplet" /> {weather.main.humidity}%</p>
                    <p><FontAwesomeIcon icon="fa-solid fa-smog" /> {weather.main.pressure}</p>
                </div>
            </div>
        </div>
    )
}

export default WeatherInformations