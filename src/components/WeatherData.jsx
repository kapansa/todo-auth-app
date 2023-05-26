import React, { useState } from "react";
import "./Styles.css";
import axios from "axios";

export const WeatherData = () => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [city, setCity] = useState("");

  const HandleClick = (e) => {
    e.preventDefault();
    const options = {
      method: "GET",
      url: `https://open-weather13.p.rapidapi.com/city/${city}`,
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
      },
    };
    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        setData(response.data);
        setCity("");
        console.log(response.data);
      } catch (error) {
            setErr(true);
            setTimeout(() => {
              setErr(false);
            }, 2000);
        console.error(error.message);
      }
    };

    if (city === "") {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    } else {
      fetchData();
    }
  };

  return (
    <div className="weather">
      <div className="weather_data">
        <form onSubmit={HandleClick}>
          <input
            type="text"
            className="input_weather"
            placeholder="Enter city name..."
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <input
            className="input_weather get_data"
            type="submit"
            value="Get Data"
          />
        </form>
      </div>
      <h2>Weather Forecast</h2>
      {err && <p className="err">Please enter a valid city!</p>}
      {data?.length === 0 ? (
        ""
      ) : (
        <div className="data">
          <div className="weather_icon">
            <p>{data?.weather[0]?.description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
              alt="icon"
            />
          </div>
          <p>
            <span>City:</span> {data?.name}
          </p>
          <p>
            <span>Temperature:</span> {data?.main?.temp}°C
          </p>
          <p>
            <span>Pressure:</span> {data?.main?.pressure} hPa
          </p>
          <p>
            <span>Humiditiy:</span> {data?.main?.humidity} %
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(WeatherData);
