import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/weather.css';
import warm from '../assets/warm.jpeg';
import cool from '../assets/cool.jpeg';
import cold from '../assets/cold.jpeg';
import hot from '../assets/hot.webp';

const Weather = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [bgImage, setBgImage] = useState("");
  const navigate = useNavigate();

  if (!data) {
    return <div>No weather data available</div>;
  }

  const { city, list } = data;
  const currentTemp = Math.round(list[0].main.temp);
  const weatherCondition = list[0].weather[0].main; 

  useEffect(() => {
    if (currentTemp < 0) {
      setBgImage(cold);
    } else if (currentTemp >= 0 && currentTemp < 20) {
      setBgImage(cool);
    } else if (currentTemp >= 20 && currentTemp < 30) {
      setBgImage(warm);
    } else {
      setBgImage(hot);
    }
  }, [currentTemp]);
  const handleChange=()=>{
      navigate('/')
  }

  const dailyForecasts = list.filter(forecast => forecast.dt_txt.includes("12:00:00")).slice(0, 6); 

  return (
    <div className="weather-app" style={{ backgroundImage: `url(${bgImage})` }}>
    
      <div className="current-weather">
        <div className="current-temp">
          <h1>{currentTemp}°</h1>
          
          <img
            src={`http://openweathermap.org/img/wn/${list[0].weather[0].icon}@2x.png`}
            alt={weatherCondition}
          />
        </div>
        <h4>{weatherCondition} </h4>
        <h1>{city.name}</h1>
        <p>Chance of rain: <span>{list[0].pop * 100}%</span></p>
      </div>

      <div className="weekly-forecast">
        <h3>Weekly Forecast</h3>
        <div className="daily-forecast">
          {dailyForecasts.map((forecast, index) => (
           <div>
             <div key={index} className="daily-card">
              <div className="info">
                <p>{Math.round(forecast.main.temp_max)}°/{Math.round(forecast.main.temp_min)}°C</p>
                <p>{forecast.weather[0].main}</p>
              </div>
              <div className="date">
                <p>{new Date(forecast.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <p>{new Date(forecast.dt_txt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
              </div>
          
             
            </div>
            <hr />
           </div>
          ))}
        </div>
        <button  className="city" onClick={handleChange}>Change City</button>
      </div>
    </div>
  );
};

export default Weather;
