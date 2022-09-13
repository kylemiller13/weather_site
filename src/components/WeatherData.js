import React, { useState, useEffect } from 'react';

function WeatherData() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("Los angeles");
  
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
          if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
          } else {
            return response.json()
          }
        })
      .then((jsonifiedResponse) => {
          setData(jsonifiedResponse)
          setIsLoaded(true)
        })
      .catch((error) => {
        setError(error.message)
        setIsLoaded(true)
      });
    }, [])
    if (error) {
      return <h1>Error: {error}</h1>;
    } else if (!isLoaded) {
      return <h1>...Loading...</h1>;
    } else {
      return (
        <React.Fragment>
        <div className="app">
          <div className="search">
            <input
              value={location}
              onChange={event => setLocation(event.target.value)}
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
                  <h1>{data.main.temp.toFixed()}°F</h1>
                </div>
                
                {data["weather"].map((weatherData, index) =>
                  <div key={index}>
                    <p>{weatherData["description"]}</p>
                  </div>
                )}
              </div>
              <div className="bottom">
                <div className="humidity">
                  <p>{data.main.humidity}%</p>
                  <p>Humidity</p>
                </div>
                <div className="feels">
                  <p>{data.main.feels_like.toFixed()}°F</p>
                  <p>Feels Like</p>
                </div>
                <div className="speed">
                  <p>{data.wind.speed.toFixed()} MPH</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
        </div>
        </React.Fragment>
      );
    }
}

export default WeatherData;


