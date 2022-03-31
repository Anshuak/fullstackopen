import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [weatherReport, setWeatherReport] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setWeatherReport(response.data);
      })
      .catch((err) => console.log(err));
  }, [city]);

  const temp = weatherReport ? weatherReport.main.temp + " Celcius" : "N/A";
  const wind = weatherReport ? weatherReport.wind.speed + " m/s" : "N/A";
  const icon = weatherReport ? weatherReport.weather[0].icon : "";

  return (
    <>
      {weatherReport && (
        <div>
          <h2>Weather in {city}</h2>
          <p>temperature {temp}</p>
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather-icon"
          />
          <p>wind {wind}</p>
        </div>
      )}
    </>
  );
};

export default Weather;
