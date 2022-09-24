import React, { useState } from 'react';
import axios from 'axios';
import { UilTemperatureThreeQuarter, 
  UilWind, 
  UilTear 
} from '@iconscout/react-unicons';
import { CardContent } from '@mui/material';




function WeatherData() {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState('');
  const [futureData, setFutureData] = useState([]);
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`

  const londonURL = `https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=${process.env.REACT_APP_API_KEY}`

  const tokyoURL = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&units=imperial&appid=${process.env.REACT_APP_API_KEY}`

  const losAngelesURL = `https://api.openweathermap.org/data/2.5/weather?q=Los Angeles&units=imperial&appid=${process.env.REACT_APP_API_KEY}`

  const newYorkURL = `https://api.openweathermap.org/data/2.5/weather?q=New York&units=imperial&appid=${process.env.REACT_APP_API_KEY}`

  const fiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`


  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      const requestOne = axios.get(url);
      const requestTwo = axios.get(fiveDay);
      axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        setData(responses[0].data)
        setFutureData(responses[1].data)
      }))
      setLocation('')
    }
  }
  const londonClick = () => {
    const requestLondon = axios.get(londonURL);
    const requestTwo = axios.get(fiveDay);
      axios.all([requestLondon, requestTwo]).then(axios.spread((...responses) => {
        setData(responses[0].data)
        setFutureData(responses[1].data)

      }))
      setLocation('London')
  }
  const tokyoClick = () => {
    const requestTokyo = axios.get(tokyoURL);
    const requestTwo = axios.get(fiveDay);
      axios.all([requestTokyo, requestTwo]).then(axios.spread((...responses) => {
        setData(responses[0].data)
        setFutureData(responses[1].data)

    }))
      setLocation('Tokyo')
  }
  const losAngelesClick = () => {
    const requestLosAngeles = axios.get(losAngelesURL);
    const requestTwo = axios.get(fiveDay);
      axios.all([requestLosAngeles, requestTwo]).then(axios.spread((...responses) => {
        setData(responses[0].data)
        setFutureData(responses[1].data)
        console.log(responses[0].data, responses[1].data)
    }))
      setLocation('Los Angeles')
  }

  const newYorkClick = () => {
    const requestNewYork = axios.get(newYorkURL);
    const requestTwo = axios.get(fiveDay);
      axios.all([requestNewYork, requestTwo]).then(axios.spread((...responses) => {
        setData(responses[0].data)
        setFutureData(responses[1].data)
    }))
      setLocation('New York')
  }
  
    return (
      <React.Fragment>
      <div className="app">
        <div className="searchBTN">
          <button type="button"
            onClick={() => londonClick()}
            >London</button>
            <button type="button"
            onClick={() => tokyoClick()}
            >Tokyo</button>
            <button type="button"
            onClick={() => losAngelesClick()}
            >Los Angeles</button>
            <button type="button"
            onClick={() => newYorkClick()}
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
            <div className="middle">
              <div className="card1">
                <CardContent>
                  {futureData.list ? <p>{new Date(futureData.list[0].dt * 1000).toUTCString().slice(0,12)}</p> : null}
                    {futureData.list ? <p>{new Date(futureData.list[0].dt * 1000).toLocaleString().slice(10)}</p> : null}
                    {futureData.list ? <img src={`http://openweathermap.org/img/wn/${futureData.list[0].weather[0].icon}.png`} alt="OpenWeather icons"/> : null}
                    {futureData.list ? <p>{futureData.list[0].main.temp.toFixed()}°F</p> : null}
                </CardContent>
              </div>
              <div className="card2">
              <CardContent>
                {futureData.list ? <p>{new Date(futureData.list[1].dt * 1000).toUTCString().slice(0,12)}</p> : null}
                  {futureData.list ? <p>{new Date(futureData.list[1].dt * 1000).toLocaleString().slice(10)}</p> : null}
                  {futureData.list ? <img src={`http://openweathermap.org/img/wn/${futureData.list[1].weather[0].icon}.png`} alt="OpenWeather icons"/> : null}
                  {futureData.list ? <p>{futureData.list[1].main.temp.toFixed()}°F</p> : null}
              </CardContent>
              </div>
              <div className="card3">
              <CardContent>
                {futureData.list ? <p>{new Date(futureData.list[10].dt * 1000).toUTCString().slice(0,12)}</p> : null}
                  {futureData.list ? <p>{new Date(futureData.list[10].dt * 1000).toLocaleString().slice(10)}</p> : null}
                  {futureData.list ? <img src={`http://openweathermap.org/img/wn/${futureData.list[10].weather[0].icon}.png`} alt="OpenWeather icons"/> : null}
                  {futureData.list ? <p>{futureData.list[9].main.temp.toFixed()}°F</p> : null}
              </CardContent>
              </div>
              <div className="card4">
              <CardContent>
                {futureData.list ? <p>{new Date(futureData.list[11].dt * 1000).toUTCString().slice(0,12)}</p> : null}
                  {futureData.list ? <p>{new Date(futureData.list[11].dt * 1000).toLocaleString().slice(10)}</p> : null}
                  {futureData.list ? <img src={`http://openweathermap.org/img/wn/${futureData.list[11].weather[0].icon}.png`} alt="OpenWeather icons"/> : null}
                  {futureData.list ? <p>{futureData.list[3].main.temp.toFixed()}°F</p> : null}
              </CardContent>
              </div>
              <div className="card5">
              <CardContent>
                {futureData.list ? <p>{new Date(futureData.list[12].dt * 1000).toUTCString().slice(0,12)}</p> : null}
                  {futureData.list ? <p>{new Date(futureData.list[12].dt * 1000).toLocaleString().slice(10)}</p> : null}
                  {futureData.list ? <img src={`http://openweathermap.org/img/wn/${futureData.list[12].weather[0].icon}.png`} alt="OpenWeather icons"/> : null}
                  {futureData.list ? <p>{futureData.list[4].main.temp.toFixed()}°F</p> : null}
              </CardContent>
              </div>
            </div>
            <div className="bottom">
              <div className="humidity" >
              {data.main ? <p className='bold'><UilTear size="20"/>{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="feels">
              {data.main ?  <p className='bold'><UilTemperatureThreeQuarter size="20"/> {data.main.feels_like.toFixed()}°F</p> : null}
                <p> Feels Like</p>
              </div>
              <div className="speed">
                {data.wind ? <p className='bold'><UilWind size="20"/>{data.wind.speed.toFixed()} MPH</p> : null}
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
      </div>
      </React.Fragment>
    );
}

export default WeatherData;