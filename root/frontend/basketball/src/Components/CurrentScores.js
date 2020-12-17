import React from "react";
import logoDict from "../Assets/logoDict";

class CurrentScores extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     isLoaded: false,
  //   };
  // }
  componentDidMount() {
    // this.props.loadScores();
  }
  render() {
    // console.log(this.props);
    // setTimeout(function (){
    //   this.props.handleClick()

    // },100)
    // setInterval(function () {
    //   this.props.handleClick()
    //   alert("Hello");
    // }, 120000);

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
          <div>
            {this.props.scores.map((game) => (
              <div
                key={`${game.id}`}
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
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentScores;
