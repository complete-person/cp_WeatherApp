import axios from "axios";
import { useState, useEffect } from "react";

const weather_clear = require('./assets/weather assets/1 clear.png');
const weather_clouds = require('./assets/weather assets/1 clouds.png');
const weather_drizzle = require('./assets/weather assets/1 drizzle.png');
const weather_dust = require('./assets/weather assets/1 dust.png');
const weather_fog = require('./assets/weather assets/1 fog.png');
const weather_haze = require('./assets/weather assets/1 haze.png');
const weather_mist = require('./assets/weather assets/1 dust.png');
const weather_rain = require('./assets/weather assets/1 rain.png');
const weather_snow = require('./assets/weather assets/1 snow.png');
const weather_thunderstorm = require('./assets/weather assets/1 thunderstorm.png');
const weather_tornado = require('./assets/weather assets/1 tornado.png');
const weather_smoke = require('./assets/weather assets/1 smoke.png');

const WeatherApp = () => {
    const URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "be8386ac0f45378be8044610a95e4f38";

    let [weatherInfos, setWeatherInfos] = useState({});
    let [value, setValue] = useState('');
    let [weatherState, setWeatherState] = useState('');

    const search = async (e) => {
        if (e.key == "Enter") {
            await axios.get(URL, {
                params: {
                    q: value.toLowerCase(),
                    units: 'metric',
                    APPID: API_KEY
                }
            })
            .then(res => {
                setWeatherInfos(res.data);
                switch (weatherInfos.weather[0].main) {
                    case 'Clear':
                        setWeatherState(weather_clear);
                        break;
                    case 'Clouds':
                        setWeatherState(weather_clouds);
                        break;
                    case 'Drizzle':
                        setWeatherState(weather_drizzle);
                        break;
                    case 'Dust':
                        setWeatherState(weather_dust);
                        break;
                    case 'Tornado':
                        setWeatherState(weather_tornado);
                        break;
                    case 'Fog':
                        setWeatherState(weather_fog);
                        break;
                    case 'Haze':
                        setWeatherState(weather_haze);
                        break;
                    case 'Mist':
                        setWeatherState(weather_mist);
                        break;
                    case 'Smoke':
                        setWeatherState(weather_smoke);
                        break;
                    case 'Rain':
                        setWeatherState(weather_rain);
                        break;
                    case 'Snow':
                        setWeatherState(weather_snow);
                        break;
                    case 'Thunderstorm':
                        setWeatherState(weather_thunderstorm);
                        break;
                }
                setValue('');
            })
        }
    }

    return ( 
        <div className="main">
            <div className="header">
                <div className="weather-info">
                    <div className="country">
                        <p>{!weatherInfos.name ? 'City' : weatherInfos.name}</p>
                    </div>
                    <div className="input">
                        <input 
                            type="text" 
                            placeholder="Enter country"
                            value={value}
                            onInput={e => setValue(e.target.value)}
                            onKeyPress={search}
                        />
                    </div>
                </div>
            </div>
            { 
                weatherInfos.name && 
                <>
                    <div className="weather_icon">
                        <img 
                            src={weatherState}
                            alt="cloudy weather" 
                            width={300}
                        />
                    </div>
                    <div className="weather-infos">
                        <div className="temp">
                            <div className="temp_left">
                                {weatherInfos.main && weatherInfos.main.temp.toFixed()}
                                <div className="temp_left__circle"></div>
                                C
                            </div>
                        </div>
                        <div className="temp_bottom">
                            <p>
                                Humidity: {weatherInfos.main && weatherInfos.main.humidity}
                            </p>
                            <p>
                                Pressure: {weatherInfos.main && weatherInfos.main.pressure}
                            </p>
                            <p>
                                Sunrise: {weatherInfos.sys && weatherInfos.sys.sunrise}
                            </p>
                            <p>
                                Sunset: {weatherInfos.sys && weatherInfos.sys.sunset}
                            </p>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}
 
export default WeatherApp;