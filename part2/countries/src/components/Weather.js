const Weather = ({weather}) => {
return (
  <div>
        
        <h3>Weather in {weather.name}</h3>
        <p>
          Temperature {(weather.main.temp - 273.15).toFixed(2)} Celcius
        </p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt=""
        />
        <p>{console.log(weather)}</p>
        <p>Wind {weather.wind.speed} m/s</p>
      </div>
)
}

export default Weather