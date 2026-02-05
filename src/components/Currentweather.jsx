import { useState, useEffect } from "react";
import imgWind from "../assets/windy.png";
import imgHum from "../assets/humidity.png";
import "../css/currentweather.css";

function Currentwather() {
  const [cityname, setCityname] = useState("");
  const [dataweather, setDataweather] = useState(null);
  const [currentIcon, setCurrentIcon] = useState("");
  const apiKey = "02fa1ee08b97729cf1a7c7be1bbd0faf";

  console.log(dataweather);

  const now = new Date();
  const day = now.getDate();
  const monthName = now.toLocaleString("en", { month: "long" });

  async function getWeather(city) {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Такого города нет!");
      }

      const result = await response.json();
      setDataweather(result);

      const iconUrl = `https://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`;
      setCurrentIcon(iconUrl);

      console.log(result);
    } catch (err) {
      alert(err);
    }
    setCityname("");
  }

  useEffect(() => {
    getWeather();
  }, []);

  const resetWeaher = () => {
    setCityname("");
    setCurrentIcon("");
    setDataweather(null);
  };

  return (
    <div className="wrapper-weather">
      <button
        onClick={() => resetWeaher()}
        className={!dataweather ? "btn-reset" : "btn-reset active"}
      >
        X
      </button>
      <h1 className="title-weather">Weather App</h1>
      <p className="name-day-month">
        Today, <span>{day}</span>
        <span style={{ marginLeft: "5px" }}>{monthName}</span>
      </p>
      <div className="wrapper-top">
        <input
          value={cityname}
          onChange={(e) => setCityname(e.target.value)}
          type="text"
          placeholder="Enter name city . . ."
          className="name-city"
        />
        <button onClick={() => getWeather(cityname)} className="btn-search">
          <img
            src="src/assets/search.png"
            alt="search-img"
            className="img-search"
          />
        </button>
      </div>
      {dataweather && (
        <>
          <h1 className="title-city">{dataweather.name}</h1>
          <div className="wrapper-tep">
            <span>{dataweather.main.temp.toFixed(0)}°C</span>
            <img src={currentIcon} alt="icon" className="icons-temp" />
          </div>
          <div className="wrapper-icon-info">
            <div className="icon-top">
              <span id="text-wind">
                <img src={imgWind} alt="icon" className="imgIcon" />
                Wind
              </span>
              <span className="text-value">{dataweather.wind.speed} m/s</span>
            </div>
            <div className="icon-top">
              <span id="text-wind">
                <img src={imgHum} alt="icon" className="imgIcon" />
                Hum
              </span>
              <span className="text-value">{dataweather.main.humidity} %</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default Currentwather;
