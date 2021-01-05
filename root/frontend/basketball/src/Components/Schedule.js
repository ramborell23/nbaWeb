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

    return (<div>
        Schedule
        <br />
        <div style={{ display: 'flex', flexDirection: "column" }}>
            {data.map(function (game) { 
                return (
                  <div
                    style={{ display: "flex", flexDirection: "row" }}
                    key={game._id.substring(7)}
                  >
                    {/* {console.log(logoDict['Brooklyn Nets'])} */}
                    <div style={{ display: "flex", flexDirection: "column", fontSize:'20px' }}>
                      {game.Date}
                      <label>Start Time:{game["Start (ET)"]}</label>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <img
                          style={{ height: 30, width: 30 }}
                          src={logoDict[`${game["Home/Neutral"]}`].logo}
                          alt="Team Logo"
                        />
                        {game["Home/Neutral"]} VS {game["Visitor/Neutral"]}{" "}
                        <img
                          style={{ height: 30, width: 30 }}
                          src={logoDict[`${game["Visitor/Neutral"]}`].logo}
                          alt="Team Logo"
                        />
                        <br /> <br />
                      </div>
                    </div>
                  </div>
                );
            })}
             
                


        </div>
    </div>);
}
