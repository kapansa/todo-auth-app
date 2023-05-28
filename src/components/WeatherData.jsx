import React, { useState, useEffect } from "react";
import "./Styles.css";
import axios from "axios";

const WeatherData = () => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [city, setCity] = useState("");

  useEffect(() => {
    const cityOld = JSON.parse(localStorage.getItem("city"));
    const getOldCity = async () => {
      if (cityOld !== null) {
        const urlAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${cityOld?.lat}&lon=${cityOld?.lon}&appid=5c3b913e3c5402669d0f318eab8d2868&units=metric`;
        const responseData = await axios.get(urlAPI);
        console.log(responseData.data);
        setData(responseData.data);
      }
    };
    getOldCity();
  }, []);

  const HandleClick = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      try {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=5c3b913e3c5402669d0f318eab8d2868}`;
        const response = await axios.get(url);

        const geoData = {
          lon: response?.data[0]?.lon,
          lat: response?.data[0]?.lat,
        };

        localStorage.setItem("city", JSON.stringify(geoData));

        // console.log("lon", " => ", geoData?.lon, "lan", " => ", geoData?.lat);

        const urlAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${geoData?.lat}&lon=${geoData?.lon}&appid=5c3b913e3c5402669d0f318eab8d2868&units=metric`;
        const responseData = await axios.get(urlAPI);
        // console.log(responseData.data);
        setData(responseData.data);
        setCity("");
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
      {console.log(data)}
      <div className="weather_data">
        <form onSubmit={HandleClick}>
          <input
            type="text"
            className="input_weather"
            placeholder="Enter city name..."
            onChange={(e) => setCity(e.target.value)}
            value={city}
            required
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
            <span>Temperature:</span> {data?.main?.temp} ° C
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
