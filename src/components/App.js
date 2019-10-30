import React, { useState, useEffect } from "react";
import "./../css/App.css";
import axios from "axios";
import Meteo from "./Meteo";

function App() {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("Paris");

  //Récupération des informations de l'API au chargement et dès que la ville change

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e42ca4b5c4de5ce5717d9e5bb5c1dc8f`
      )
      .then(response => {
        setWeather({
          ...weather,
          weatherMain: response.data.weather[0].main,
          lat: response.data.coord.lon,
          long: response.data.coord.lat,
          temp: Math.floor(Number(response.data.main.temp) - 273.15),
          humidity: response.data.main.humidity,
          rain: !response.data.rain ? 0 : response.data.rain.h1,
          windSpeed: Math.floor(Number(response.data.wind.speed) * 3.6),
          windDirection: response.data.wind.deg
        });
      })
      .catch(err => console.log(err));
  }, [city]);

  //Obtenir la date du jour en français
  function getDay(day) {
    if (day.includes("Mon")) return "Lundi";
    else if (day.includes("Tue")) return "Mardi";
    else if (day.includes("Wed")) return "Mercredi";
    else if (day.includes("Thu")) return "Jeudi";
    else if (day.includes("Fri")) return "Vendredi";
    else if (day.includes("Sat")) return "Samedi";
    else return "Dimanche";
  }

  function getMonth(month) {
    if (month.includes("Jan")) return "Janvier";
    else if (month.includes("Feb")) return "Février";
    else if (month.includes("Mar")) return "Mars";
    else if (month.includes("Apr")) return "Avril";
    else if (month.includes("May")) return "Mai";
    else if (month.includes("Jun")) return "Juin";
    else if (month.includes("Jul")) return "Juillet";
    else if (month.includes("Aug")) return "Août";
    else if (month.includes("Sep")) return "Septembre";
    else if (month.includes("Oct")) return "Octobre";
    else if (month.includes("Nov")) return "Novembre";
    else return "Décembre";
  }

  function getDate() {
    let date = Date.now();
    let newDate = new Date(date).toUTCString();
    let array = newDate.split(" ");
    let weekDay = getDay(array[0]);
    let month = getMonth(array[2]);

    return `${weekDay} ${array[1]} ${month}`;
  }

  //Création d'un select input customisé
  function selectInputVisible() {
    document.querySelector(".dropDown").classList.toggle("hidden");
    document.querySelector("button").classList.toggle("active");
  }

  function optionOnClick(e) {
    let ville = e.target.innerHTML;
    let button = document.querySelector("button");
    document.querySelectorAll(".option").forEach(option => {
      if (option.innerHTML === ville.toUpperCase()) {
        option.innerHTML = city === "London" ? "LONDRES" : city.toUpperCase();
      }
    });
    if (ville === "LONDRES") setCity("London");
    else setCity(ville);
    button.innerHTML = `${ville}<i className="fas fa-chevron-down"></i>`;
    selectInputVisible();
  }

  return (
    <div
      className="App"
      style={{
        backgroundImage:
          weather.weatherMain !== "Clear"
            ? "url(/img/rain.jpg)"
            : "url(/img/sun.jpg)"
      }}
    >
      <div id="coord">
        <span className="coord">Météo</span>
        <span className="coord">
          ( {weather.lat} ; {weather.long} )
        </span>
      </div>
      <h1>{city === "London" ? "LONDRES" : city.toUpperCase()}</h1>
      <h2>{weather.temp}°C</h2>
      <h3>{getDate()}</h3>
      <div className="meteoContainer">
        <Meteo information="wind" detail={weather.windSpeed} />
        <Meteo information="windDirection" detail={weather.windDirection} />
        <Meteo information="rain" detail={weather.humidity} />
        <Meteo information="rainMm" detail={weather.rain} />
      </div>
      <div id="selectInput">
        <button onClick={selectInputVisible}>
          PARIS <i className="fas fa-chevron-down"></i>
        </button>
        <div className="dropDown hidden">
          <hr />
          <span className="option" onClick={optionOnClick}>
            LONDRES
          </span>
          <span className="option" onClick={optionOnClick}>
            BANGKOK
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
