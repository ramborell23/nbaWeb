import React, { useState, useEffect } from "react";
import axios from "axios";
import logoDict from "../Assets/logoDict.js";

export default function Schedule() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios
        .get("http://localhost:8100/schedule")
        .catch((error) => console.error(error));
      console.log(response.data.schedule);
      setData(response.data.schedule);
    }
    fetchData();
  }, []);

  return (
    <div>
      Todays Game
      <br />
      <div style={{ display: "flex", flexDirection: "row", overflowX: 'auto', marginRight: '15px', alignItems:'center' }}>
        {data.map(function (game) {
          return (
            <div
              style={{ display: "flex", flexDirection: "row" }}
              key={game._id.substring(7)}
            >
              {/* {console.log(logoDict['Brooklyn Nets'])} */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* {game.Date} */}
                <label style={{ fontSize: 14 }}>{game["Start (ET)"]}</label>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <img
                    style={{ height: 30, width: 30 }}
                    src={logoDict[`${game["Home/Neutral"]}`].logo}
                    alt="Team Logo"
                  />
                  <label style={{ fontSize: 14 }}>
                    {game["Home/Neutral"]}
                    <br />
                    VS
                    <br />
                    {game["Visitor/Neutral"]}{" "}
                  </label>
                  <img
                    style={{ height: 30, width: 30, alignSelf:'flex-end' }}
                    src={logoDict[`${game["Visitor/Neutral"]}`].logo}
                    alt="Team Logo"
                  />
                  <br /> <br />
                  <hr />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
