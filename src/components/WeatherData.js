import React, { useState } from 'react';
import axios from 'axios';
import { UilTemperatureThreeQuarter, 
  UilWind, 
  UilTear 
} from '@iconscout/react-unicons';
import { CardContent } from '@mui/material';




function WeatherData() {
  // used useState to declare a state variable(data, location, futureData)  
  const [data, setData] = useState({"coord":{lon:0,lat:0}});
  const [location, setLocation] = useState('');
  const [futureData, setFutureData] = useState([]);
  //OpenWeatherMap API takes in a template literal called location
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
  //OpenWeatherMap API takes in the location London
  const londonURL = `https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
  //OpenWeatherMap API takes in the location Tokyo
  const tokyoURL = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
  //OpenWeatherMap API takes in the location Los Angeles
  const losAngelesURL = `https://api.openweathermap.org/data/2.5/weather?q=Los Angeles&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
  //OpenWeatherMap API takes in the location New York
  const newYorkURL = `https://api.openweathermap.org/data/2.5/weather?q=New York&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
  // created a const oneCall that = a function that takes in lat & lon parameters
  const oneCall = function(lat, lon){
    return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
  };

  const searchLocation = (event) => {
    // event.key is a keyboardEvent 
    if (event.key === 'Enter') {
      const requestOne = axios.get(url);
      //axios.all makes multiple HTTP requests, 
      //axios.spread is used to spread the array of arguments into multiple arguments. used to prvent multiple ajax requests with axios.all
      axios.all([requestOne]).then(axios.spread((...responses) => {
        setData(responses[0].data)
        axios.all([axios.get(oneCall(responses[0].data.coord.lat,responses[0].data.coord.lon))]).then(axios.spread((...responses) => {
          setFutureData(responses[0].data)
        }))
      }))
      setLocation('')
    }
  };
 
  console.log(futureData)
  const londonClick = () => {
    const requestOne = axios.get(londonURL);
      axios.all([requestOne]).then(axios.spread((...responses) => {
        setData(responses[0].data)
        axios.all([axios.get(oneCall(responses[0].data.coord.lat,responses[0].data.coord.lon))]).then(axios.spread((...responses) => {
          setFutureData(responses[0].data)
      }))
    }))
      setLocation('London')
  };
  const tokyoClick = () => {
    const requestOne = axios.get(tokyoURL);
      axios.all([requestOne]).then(axios.spread((...responses) => {
        setData(responses[0].data)
        axios.all([axios.get(oneCall(responses[0].data.coord.lat,responses[0].data.coord.lon))]).then(axios.spread((...responses) => {
          setFutureData(responses[0].data)
      }))
    }))
      setLocation('Tokyo')
  };
  const losAngelesClick = () => {
    const requestOne = axios.get(losAngelesURL);
      axios.all([requestOne]).then(axios.spread((...responses) => {
        setData(responses[0].data)
        axios.all([axios.get(oneCall(responses[0].data.coord.lat,responses[0].data.coord.lon))]).then(axios.spread((...responses) => {
          setFutureData(responses[0].data)
      }))
    }))
      setLocation('Los Angeles')
  };

  const newYorkClick = () => {
    const requestOne = axios.get(newYorkURL);
      axios.all([requestOne]).then(axios.spread((...responses) => {
        setData(responses[0].data)
        axios.all([axios.get(oneCall(responses[0].data.coord.lat,responses[0].data.coord.lon))]).then(axios.spread((...responses) => {
          setFutureData(responses[0].data)
      }))
    }))
      setLocation('New York')
  };  
    return (
      <React.Fragment>
      <div className="app">
        <div className="searchBTN">
          <button type="button"
          // calls the function londonClick
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
                  {/*ternary operator, new creates an instance of an object, Date is a constructor */}
                  {futureData.daily ? <p className="days">{new Date(futureData.daily[1].dt * 1000).toUTCString().slice(0,7)}</p> : null}
                    {futureData.daily ? <img src={`http://openweathermap.org/img/wn/${futureData.daily[1].weather[0].icon}.png`} alt="OpenWeatherIcons"/> : null}
                    {futureData.daily ? <p>{(futureData.daily[1].temp.day).toFixed()}° {(futureData.daily[1].temp.min).toFixed()}°</p> : null}
                </CardContent>
                
              </div>
              <div className="card1">
              <CardContent>
                {futureData.daily ? <p className="days">{new Date(futureData.daily[2].dt * 1000).toUTCString().slice(0,7)}</p> : null}
                  {futureData.daily ? <img src={`http://openweathermap.org/img/wn/${futureData.daily[2].weather[0].icon}.png`} alt="OpenWeather icons"/> : null}
                  {futureData.daily ? <p>{futureData.daily[2].temp.day.toFixed()}° {(futureData.daily[2].temp.min).toFixed()}°</p> : null}
              </CardContent>
              </div>
              <div className="card1">
              <CardContent>
                {futureData.daily ? <p className="days">{new Date(futureData.daily[3].dt * 1000).toUTCString().slice(0,7)}</p> : null}
                  {futureData.daily ? <img src={`http://openweathermap.org/img/wn/${futureData.daily[3].weather[0].icon}.png`} alt="OpenWeather icons"/> : null}
                  {futureData.daily ? <p>{futureData.daily[3].temp.day.toFixed()}° {futureData.daily[3].temp.min.toFixed()}°</p> : null}
              </CardContent>
              </div>
              <div className="card1">
              <CardContent>
                {futureData.daily ? <p className="days">{new Date(futureData.daily[4].dt * 1000).toUTCString().slice(0,7)}</p> : null}
                  {futureData.daily ? <img src={`http://openweathermap.org/img/wn/${futureData.daily[4].weather[0].icon}.png`} alt="OpenWeather icons"/> : null}
                  {futureData.daily ? <p>{futureData.daily[4].temp.day.toFixed()}° {futureData.daily[4].temp.min.toFixed()}°</p> : null}
              </CardContent>
              </div>
              <div className="card1">
              <CardContent>
                {futureData.daily ? <p className="days">{new Date(futureData.daily[5].dt * 1000).toUTCString().slice(0,7)}</p> : null}
                  {futureData.daily ? <img src={`http://openweathermap.org/img/wn/${futureData.daily[5].weather[0].icon}.png`} alt="OpenWeather icons"/> : null}
                  {futureData.daily ? <p>{futureData.daily[5].temp.day.toFixed()}° {futureData.daily[5].temp.min.toFixed()}°</p> : null}
              </CardContent>
              </div>
              <div className="card1">
              <CardContent>
                {futureData.daily ? <p className="days">{new Date(futureData.daily[6].dt * 1000).toUTCString().slice(0,7)}</p> : null}
                  {futureData.daily ? <img src={`http://openweathermap.org/img/wn/${futureData.daily[6].weather[0].icon}.png`} alt="OpenWeather icons"/> : null}
                  {futureData.daily ? <p>{futureData.daily[6].temp.day.toFixed()}° {futureData.daily[6].temp.min.toFixed()}°</p> : null}
              </CardContent>
              </div>
              <div className="card1">
              <CardContent>
                {futureData.daily ? <p className="days">{new Date(futureData.daily[7].dt * 1000).toUTCString().slice(0,7)}</p> : null}
                  {futureData.daily ? <img src={`http://openweathermap.org/img/wn/${futureData.daily[7].weather[0].icon}.png`} alt="OpenWeather icons"/> : null}
                  {futureData.daily ? <p>{futureData.daily[7].temp.day.toFixed()}° {futureData.daily[7].temp.min.toFixed()}°</p> : null}
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