import React from "react";
import logoDict from "../Assets/logoDict";
const time = new Date();

class CurrentScores extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      count: 0,
    };
  }

  incrementScores = () => {
    const { count } = this.state;
    console.log(
      time.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
    console.log("Reloaded", count, this.props);
    this.setState({ count: count + 1 });
    this.props.loadScores();

  };

  componentDidMount() {
    console.log("Reloaded", this.props);
    setInterval(this.incrementScores, 60000);
  }

  render() {
    const { count } = this.state;

    setInterval(function () {
      console.log(
        time.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      );
      console.log("Reloaded", count, this.props);
    }, 60000);


    return (
      <div className="wrapper">
        <div
          style={{
            backgroundColor: `${this.props.color}`,
          }}
          className="box"
        >
          <button
            onClick={() => {
              this.props.handleClick();
            }}
          >
            Change Score
          </button>
          <div style={{ display: "flex", flexDirection: "row", overflowX: 'auto', marginRight: '15px', alignItems:'center' }}>
        {this.props.scores.map(function (game) {
          return (
            <div
              style={{ display: "flex", flexDirection: "row" }}
              key={game.id}
            >
              {/* {console.log(logoDict['Brooklyn Nets'])} */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* {game.Date} */}
                <label style={{ fontSize: 14 }}>{game["Start (ET)"]}</label>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <img
                    style={{ height: 30, width: 30 }}
                    src={logoDict[`${game.game.homeTeamName}`].logo}
                    alt="Team Logo"
                  />
                  <label style={{ fontSize: 14 }}>
                    {game.game.homeTeamName}
                    <br />
                    {game.game.homeTotal}
                    VS
                  <hr/>
                  <br/>
                  <hr/>
                    {game.game.awayTotal}
                    <br />
                    {game.game.awayTeamName}{" "}
                  </label>
                  <img
                    style={{ height: 30, width: 30, alignSelf: "flex-end" }}
                    src={logoDict[`${game.game.awayTeamName}`].logo}
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
          </div>
    );
  }
}

export default CurrentScores;
