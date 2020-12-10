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
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        {console.log(logoDict['Brooklyn Nets'])}
                        <img style={{height:20, width:20}} src={logoDict[`${game["Home/Neutral"]}`].logo} alt="Team Logo" />
                        {game["Home/Neutral"]}{" "}
                        {" "}VS{" "}
                        {" "}{game["Visitor/Neutral"]}{" "}
                        <img style={{height:20, width:20}} src={logoDict[`${game["Visitor/Neutral"]}`].logo} alt="Team Logo" />
                  </div>
                );
            })}
             
                


        </div>
    </div>);
}
