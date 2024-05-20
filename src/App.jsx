import React, { useEffect, useState } from 'react'
import hotbg from './assets/hot.jpg'
import coldbg from './assets/cold.jpg'
import Description from './components/Description'
import { getFormattedWeatherData } from './weatherService'

const App = () => {
  const [city,setCity] = useState('kathmandu');
  const [weather,setWeather] = useState(null);
  const  [units,setUnits] = useState('metric');
  const [bg, setBg] = useState(hotbg);

  useEffect(() =>{
    const fetchWeatherData = async() => {
      const data = await getFormattedWeatherData(city,units);
      setWeather(data);

      const threshold = units === 'metric' ? 20 : 60;
      if (data.temp <= threshold) setBg(coldbg);
      else setBg(hotbg)
    };
    fetchWeatherData();
  }, [units,city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }

  return (
    <div className='app' style={{backgroundImage: `url(${bg})`}}>
      <div className="overlay">

        {weather && (
          <div className="container">
          <div className="section section_inputs">
            <input onKeyDown={enterKeyPressed} type='text' name='city' placeholder='Enter City...'></input>
            <button onClick={handleUnitsClick}>°F</button>
          </div>
          <div className="section section_temperature">
            <div className="icon">
              <h3>{`${weather.name},${weather.country}`}</h3>
              <img src={weather.iconURL}/>
              <h3>{weather.description}</h3>
            </div>

            <div className="temperature">
              <h1>{`${weather.temp.toFixed()}°${units === 'metric' ? 'C' : 'F'}`}</h1>
            </div>
          </div>
          
          <Description weather={weather} units={units} />
        </div>
        )
        }
      </div>
    </div>
  )
}

export default App