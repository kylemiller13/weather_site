import React, { useState } from 'react';
import axios from 'axios';

function WeatherData() {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState('');


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`

  const londonURL = `https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=${process.env.REACT_APP_API_KEY}`

  const parisURL = `https://api.openweathermap.org/data/2.5/weather?q=Paris&units=imperial&appid=${process.env.REACT_APP_API_KEY}`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
      })
      setLocation('')
    }
  }
  const londonClick = () => {
    axios.get(londonURL).then((response) => {
      setData(response.data)
    })
      setLocation('London')
  }
  const parisClick = () => {
    axios.get(parisURL).then((response) => {
      setData(response.data)
    })
      setLocation('Paris')
  }
  

    return (
      <React.Fragment>
      <div className="app">
        <div className="searchBTN">
          <button type="button"
            onClick={() => londonClick()}
            >London</button>
            <button type="button"
            onClick={() => parisClick()}
            >Paris</button>
            <button type="button"
            onClick={() => setLocation('Los Angeles')}
            >Los Angeles</button>
            <button type="button"
            onClick={() => setLocation('New York')}
            >New York</button>
        </div>
        <div className="search">
          <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder='Enter Location'
            type="text"
            />
        </div>
          <div className="container">
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
              </div>
              <div className="description">
                {data.weather ? <p>{data.weather[0].main}</p> : null}
              </div>
            </div>
            <div className="bottom">
              <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
                <p>Feels Like</p>
              </div>
              <div className="speed">
                {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
      </div>
      </React.Fragment>
    );
}

export default WeatherData;


