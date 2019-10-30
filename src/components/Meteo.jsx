import React from "react";

function Meteo(props) {
  let information = props.information;
  let detail = !props.detail ? 0 : props.detail;
  let image = "";
  let title = "";

  //Déterminer la nature de l'information pour customiser l'affichage

  function defineInformation(info) {
    if (info === "wind") {
      image = "./img/icons/arrow.svg";
      title = "Direction et vitesse du vent";
      detail = `${detail} km/h`;
    } else if (info === "windDirection") {
      image = "./img/icons/arrows.svg";
      title = "Vitesse des rafales de vent";
      detail = `${detail} km/h`;
    } else if (info === "rain") {
      image = "./img/icons/rainIcon.svg";
      title = "Risque de précipitation";
      detail = `${detail} %`;
    } else {
      image = "./img/icons/rainArrow.svg";
      title = "Niveau de précipitation";
      detail = `${detail} mm`;
    }
  }

  defineInformation(information);

  return (
    <div className="weatherInformation">
      <div className="informationContainer">
        <img src={image} alt="icon" />
        <span className="detail">{detail}</span>
      </div>
      <span className="title">{title}</span>
    </div>
  );
}

export default Meteo;
