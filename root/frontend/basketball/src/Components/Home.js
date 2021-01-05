import React, { useState, useEffect } from "react";
import axios from "axios";
import logoDict from "../Assets/logoDict.js";
import CurrentScores from "./CurrentScores.js";

let myRe = [/o/g];

export default function Home() {
  const [data, setData] = useState([]);

  const style = {
    xxxxx: {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial",
    },
    containerStyle: {
      display: "flex",
      flexDirection: "row",
      margin: "5px",
      alignItems: "center",
      //    height: '100px',
      width: "250px",
      border: "black 2px solid",
      // justifyContent: "flex-start"
    },
    logoStyle: {
      height: "50px",
      width: "50px",
      margin: "5px",
    },
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios
        .get("http://localhost:8100/draft")
        .catch((error) => console.error(error));
      setData(response.data.players2020);
    }
    fetchData();
  }, []);

  console.log("=====>>>>", data);
  return (
    <div>
      {/* <CurrentScores style={{ marginBottom: 15 }} /> */}
      <br />
      <br />
      <img
        src={logoDict.NBATWO.logo}
        alt="Team Logo"
        style={{ height: "400px", width: "400px" }}
      />

      <div>
        {" "}
        <br />
        NBA DRAFT
        <br />
        <br />
        Round 1
        <ul style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          {data.map(function (player) {
            if (player.Pk <= 30) {
              return (
                <li key={player._id} style={style.containerStyle}>
                  <label>{player.Pk}</label>
                  <img
                    style={style.logoStyle}
                    src={logoDict[`${player.Tm}`].logo}
                    alt="Team Logo"
                  />
                  {player.Player.split("\\")[0]}
                  <br />
                  {player.College}
                </li>
              );
            }
          })}
        </ul>
        Round 2
        <ul style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          {data.map(function (player) {
            if (player.Pk > 30) {
              return (
                <li key={player._id} style={style.containerStyle}>
                  <label style={{ marginLeft: "8px", marginRight: "0px" }}>
                    {player.Pk}
                  </label>
                  <img
                    style={style.logoStyle}
                    src={logoDict[`${player.Tm}`].logo}
                    alt="Team Logo"
                  />
                  {player.Player.split("\\")[0]}
                  <br />
                  {player.College}
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}
