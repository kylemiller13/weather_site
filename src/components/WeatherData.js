import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UilTemperatureThreeQuarter, UilWind, UilTear} from '@iconscout/react-unicons';
import { CardContent, Grid } from '@mui/material';
import Card from '@material-ui/core/Card';
import {AppBar, Toolbar, Button, Typography, TextField, LinearProgress} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';





const useStyles = makeStyles({
  card: {
    // styles for the card 
    elevation: 24, // add a drop shadow
    opacity: 0.8, // make the card transparent
    transition: '0.3s', // animate the transition
    boxShadow: '0 0 10px rgba(0,0,0,0.3)', // add a drop shadow
    backgroundColor: 'rgba(255,255,255, 0.2)',
    border: '1px solid #000'
  }
});


function WeatherData() {
  
  const classes = useStyles();

  // used useState to declare a state variable(data, location, futureData)  
  const [data, setData] = useState({"coord":{lon:0,lat:0}});
  const [location, setLocation] = useState('');
  const [futureData, setFutureData] = useState([]);
  const cities = ['London', 'Tokyo', 'Los Angeles', 'New York'];
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=`;
  const units = `&units=imperial`;
  const apiKey = `&appid=${process.env.REACT_APP_API_KEY}`;
  const [showMessage, setShowMessage] = useState(true);
  const [loading, setLoading] = useState(false);
  
  //OpenWeatherMap API takes in a template literal called location
  const url = baseURL + `${location}`+ units + apiKey;
  //OpenWeatherMap API takes in the location London, Tokyo, Los Angeles, New York
  
  // created a const oneCall that = a function that takes in lat & lon parameters
  const oneCall = function(lat, lon){
    return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
  };
  
  
  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      try {
        const requestOne = await axios.get(url);
        const requestTwo = await axios.get(oneCall(requestOne.data.coord.lat, requestOne.data.coord.lon));
        
        setData(requestOne.data);
        setFutureData(requestTwo.data);
        console.log(requestOne.data);
        
        
        
        // if (requestOne.data.weather[0].description === 'overcast clouds') {
        //   console.log(requestOne.data.weather[0].description);
          
        //   document.body.style.background = "url('.././assets/giphy.gif')";
        // } else if (requestOne.data.weather[0].description === 'light rain') {
        //   document.body.style.background = `url('.././assets/giphy.gif')`;
        // } else {
        //   document.body.style.background = `url('.././assets/cloudy.jpg')`;
        // }      
        
        
      } catch (error) {
        // error handling
        alert("Invalid location. Please enter a valid location");
        console.error(error);
      }
      
      setLocation('');
    }
  };

  
  const geoLocation = async () => {
    if (showMessage) {
      const response = window.confirm('Can I get your location?');
      if (response) {
        setShowMessage(false);
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
          async(position) => {
            try {
              
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
              const cards = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${process.env.REACT_APP_API_KEY}`;
              const [requestOne, requestTwo] = await Promise.all([axios.get(apiUrl), axios.get(cards)]);
              
              setData(requestOne.data);
              setFutureData(requestTwo.data);
              console.log(requestOne.data);
              setLoading(false);
              
              
            } catch (error) {
              console.error(error);
              setLoading(false);
            }
          }
          
          
          );
        }
      }
    }
    useEffect(() => {
      geoLocation();
    }, []);
    
  
  const citiesClick = async (city) => {
    let data;
    
    try {
      //makes an API call to the OpenWeatherMap API
      const response = await axios.get(baseURL + `${city}`+ units + apiKey);
      data = response.data;
      //if the call is successful, it sets the response data in the state data
      setData(data);
      //If the call to the OpenWeatherMap API fails, the function logs the error to the console
    } catch (error) {
      console.error(error);
    }

    
    try {
      //makes another API call to the OpenWeatherMap API
      const futureDataResponse = await axios.get(oneCall(data.coord.lat, data.coord.lon));
      //if the call is successful, it sets the response data in the state data
      setFutureData(futureDataResponse.data);
      //If the call to the OpenWeatherMap API fails, the function logs the error to the console
    } catch (error) {
      console.error(error);
    }
    
    setLocation(`${city}`);
  };
  
    return (
      <React.Fragment>
      <div className="app">

        <AppBar style={{backgroundColor: 'rgba(255,255,255, 0.2)'}}>
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Weather API 
            </Typography>
            {cities.map(city => (
              <Button key={city} onClick={() => citiesClick(city)}>
                {city}
              </Button>
            ))}
          </Toolbar>
        </AppBar>
        <div className="search">
          <TextField
            variant="outlined"
            type="search"
            label="Enter Location"
            value={location}
            onKeyPress={searchLocation}
            onChange={event => setLocation(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            />
        </div>
        <div>
          {loading ? <LinearProgress /> : Object.keys(data).length !== 0 &&   (
            
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
                

                <div className="bottom">
                  <div className="humidity">
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
              <Grid container direction="row" justify="space-between" alignItems="center" >
                {futureData.daily ? (
                  // Map over the array of daily forecast objects and access the day time(dt), icon, & temperature propertys
                  futureData.daily.map(day => 
                    <Grid item>
                      <Card className={classes.card}>
                        <CardContent>
                          <p>{new Date(day.dt * 1000).toUTCString().slice(0,7)}</p>
                          <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="OpenWeatherIcons"/>
                          <p>{(day.temp.min).toFixed()}°  {(day.temp.day).toFixed()}°</p> 
                        </CardContent>
                      </Card>
                    </Grid>
                  )
                ) : null}
              </Grid>
            </div>
          )}
        </div>
      </div>
      </React.Fragment>
    );
}

export default WeatherData;