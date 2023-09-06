import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UilTemperatureThreeQuarter, UilWind, UilTear} from '@iconscout/react-unicons';
import { CardContent, Grid } from '@mui/material';
import Card from '@material-ui/core/Card';
import {AppBar, Toolbar, Button, Typography, TextField, LinearProgress, Paper} from '@material-ui/core';
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
    // border: '1px solid #000'
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
  
  
  const searchLocation = async (event, setBackground) => {
    if (event.key === 'Enter') {
      try {
        const requestOne = await axios.get(url);
        const requestTwo = await axios.get(oneCall(requestOne.data.coord.lat, requestOne.data.coord.lon));
        
        setData(requestOne.data);
        setFutureData(requestTwo.data);
        console.log(requestOne.data);
        
        
        // if (requestOne.data.weather[0].description === 'clouds') {
        //   console.log(requestOne.data.weather[0].description);
          
        //   setBackground('url(././assets/giphy.gif)');
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
      const response = window.confirm('Allow "Skycast" to use your location?\n\nYour location is used to showcase for both the current forecast and the upcoming seven days.');
      if (response) {
        setShowMessage(false);
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
          async(position) => {
            try {
              
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
              const cards = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${process.env.REACT_APP_API_KEY}`;
              const [requestOne, requestTwo] = await Promise.all([axios.get(apiUrl), axios.get(cards)]);
              
              setData(requestOne.data);
              setFutureData(requestTwo.data);
              console.log(requestTwo.data);
              setLoading(false);
              
              
            } catch (error) {
              console.error(error);
              setLoading(false);
            }
          }
        );
      }else {
        setShowMessage(false);
      }
        }
    }


    useEffect(() => {
      geoLocation();
    });

  
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
        <AppBar style={{backgroundColor: 'rgba(255,255,255, 0.2)', height: '80px'}}>
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 0.5, color: 'black' }}> 
              SkyCast 
            </Typography>
              <div className="search" >
                <TextField
                  // variant="outlined"
                  type="search"
                  placeholder="Search"
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
          </Toolbar>
        </AppBar>

        <div>
          {loading ? <LinearProgress /> : Object.keys(data).length !== 0 &&   (
            
            <div className="container">

              <div className='topCard'>
                <Paper
                  style={{
                    width: '100%',
                    // maxWidth: '1000px',
                    maxWidth: '75%',     
                    height: '100%',   
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundImage: "url('../components/assets/mountain.jpg')",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)', // Adding a subtle shadow
                  }}
                >

                <div className="top">
                  {cities.map(city => (
                    <Button key={city} onClick={() => citiesClick(city)}>
                      {city}
                    </Button>
                  ))}
                  <div className="location">
                    <p>{data.name}</p>
                  </div>
                  <div className="temp">
                    {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
                  </div>
                  <div className="description">
                    {data.weather ? <p>{data.weather[0].main}</p> : null}
                  </div>

                  {data.main ? (
                    <div className="bottom">
                      <div className="humidity">
                        <p className='bold'><UilTear size="20"/>{data.main.humidity}%</p> 
                        <p>Humidity</p> 
                      </div> 
                      <div className="feels">
                        <p className='bold'><UilTemperatureThreeQuarter size="20"/> {data.main.feels_like.toFixed()}°F</p>
                        <p> Feels Like</p>
                      </div>
                      <div className="speed">
                        <p className='bold'><UilWind size="20"/>{data.wind.speed.toFixed()} MPH</p>
                        <p>Wind Speed</p>
                      </div>
                    </div>  
                  ) : null}
                </div> 
                </Paper>
              </div>

              <br></br>


            <div className='dailyCards'>
              <Paper
                style={{
                  width: '100%',
                  // maxWidth: '1000px',
                  maxWidth: '85%',     
                  height: '75%',   
                  flexDirection: 'row',
                  alignItems: 'center',

                  backgroundImage: "url('./assets/mountain.jpg')",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover',
                  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)', // Adding a subtle shadow
                }}
              >

                <div>
                  <Typography variant="h5" style={{ color: 'black', padding: '20px'  }}> 
                    Daily Forecast 
                  </Typography>
                  <Grid container direction="row" justify="space-between" alignItems="center" display='flex' justifyContent='center'>
                    {futureData.daily ? (
                      // Map over the array of daily forecast objects and access the day time(dt), icon, & temperature propertys
                      futureData.daily.map(day => 
                        <Grid item key={day.dt}>
                          <Card className={classes.card}>
                            <CardContent>
                              <p>{new Date(day.dt * 1000).toUTCString().slice(0,7)}</p>
                              <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="OpenWeatherIcons"/>
                              <p className='higherTemp'>{(day.temp.day).toFixed()}° </p> 
                              <p className='lowerTemp'>{(day.temp.min).toFixed()}°</p> 
                            </CardContent>
                          </Card>
                        </Grid>
                      )
                    ) : null}
                  </Grid>
                </div>

              </Paper>
            </div>

            </div>
            
          )}
        </div>
      </div>
      </React.Fragment>
    );
}

export default WeatherData;
