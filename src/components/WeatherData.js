import React, { useState } from 'react';
import axios from 'axios';
import { UilTemperatureThreeQuarter, UilWind, UilTear} from '@iconscout/react-unicons';
import { CardContent, Grid } from '@mui/material';
import Card from '@material-ui/core/Card';
import {AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
        <AppBar style={{backgroundColor: 'rgba(255,255,255, 0.2)'}}>
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
                Kyle's Weather Data
            </Typography>
            <Button onClick={() => londonClick()}
              >London</Button>
            <Button type="button"
                onClick={() => tokyoClick()}
                >Tokyo
            </Button>
            <Button type="button"
              onClick={() => losAngelesClick()}
                >Los Angeles
            </Button>
            <Button type="button"
              onClick={() => newYorkClick()}
              >New York
            </Button>
          </Toolbar>
        </AppBar>
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
            
            <Grid container direction="row" justify="space-between" alignItems="center" >
              {futureData.daily ? (
                // Map over the array of daily forecast objects and access the day time(dt), icon, & temperature propertys
                futureData.daily.map(day => 
                  <Grid item>
                    <Card className={classes.card}>
                      <CardContent>
                        <p>{new Date(day.dt * 1000).toUTCString().slice(0,7)}</p>
                        <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="OpenWeatherIcons"/>
                        <p>{(day.temp.day).toFixed()}° {(day.temp.min).toFixed()}°</p> 
                      </CardContent>
                    </Card>
                  </Grid>
                )
              ) : null}
            </Grid>
            
            
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