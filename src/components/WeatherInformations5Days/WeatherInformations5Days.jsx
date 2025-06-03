import './WeatherInformations5Days.css'

function WeatherInformations5Days({ weather5Days }) {

    let dailyForecast = {}

    for (let forecast of weather5Days.list) {
        const date = new Date(forecast.dt * 1000).toLocaleDateString()

        if (!dailyForecast[date]) {
            dailyForecast[date] = forecast
        }
    }

    const next5DaysForecast = Object.values(dailyForecast).slice(1,6)

    function convertDate(date) {
        const newDate = new Date(date.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit' })
        return newDate
    }

    return (
        <div className='weather5days-container'>
            <p>Próximos Dias</p>
            <div className='weather-days'>
                {next5DaysForecast.map(forecast => (
                    <div className='day' key={forecast.dt}>
                        <p>{convertDate(forecast)}</p>
                        <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} />
                        <p>{forecast.weather[0].description}</p>
                        <p>{Math.round(forecast.main.temp_min)}°C min / {Math.round(forecast.main.temp_max)}°C máx</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WeatherInformations5Days