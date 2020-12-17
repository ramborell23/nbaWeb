import React, { useState, useEffect } from "react";
import axios from "axios";
import logoDict from "../Assets/logoDict";

export default function Scores() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loaded, isLoaded] = useState(false);
  // console.log("Scores==>", this.props)
  
  // async function fetchData() {
  //   const response = await axios
  //   .get("http://localhost:8100/scrape")
  //   .catch((error) => console.error(error));
  //   setData(response.data.scrape);
  //   console.log("Sending===>", response.data.scrape);
  // }
  // useEffect(() => {
  //   fetchData();
  //   isLoaded(true)
  // }, [count])
  
  // if (isLoaded) {
    //   setTimeout(() => {
      //   // alert("Sent")
      //   fetchData()
      //   }, 60000);
      // }
      console.log("Sending===>", count);
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Get Shit
      </button>
      <button
        onClick={() => { this.props.handleClick() }}>
        yiuoiuyfghkjkguyfck
      </button>
      {loaded ? (
        <div>
          Scores
          {data.map((game) => (
            <div
              style={{
                borderColor: "red",
                borderWidth: "2x",
                borderStyle: "solid",
              }}
            >
              {game.awayteamName}
              <label style={{ display: "flex", flexDirection: "column" }}>
                {game.game.awayTeamName}
                <hr />
                {game.game.awayTotal}
                <img
                  style={{ height: 25, width: 25 }}
                  src={logoDict[`${game.game.awayTeamName}`].logo}
                  alt="Away Team"
                />
              </label>
              <hr />
              <label style={{ display: "flex", flexDirection: "column" }}>
                {game.game.homeTotal}
                <hr />
                {game.game.homeTeamName}
                <img
                  style={{ height: 25, width: 25 }}
                  src={logoDict[`${game.game.homeTeamName}`].logo}
                  alt="Home Team"
                />
              </label>
            </div>
          ))}
          <br />
          <br />
          <br />
        </div>
      ) : (
        <div>
          <div> Loading....</div>
          <div> Loading....</div>
          <div> Loading....</div>
          <div> Loading....</div>
        </div>
      )}
    </div>
  );
}

