import React from "react";
import logoDict from "../Assets/logoDict";


class SorsTwo extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div style={{ backgroundColor: `${this.props.color}` }} className="box">
          <button
            onClick={() => {
              this.props.handleClick();
            }}
          >
            Change Color
          </button>
          <br />
          <br />
          {this.props.isLoaded ? (
            <div>
              Scores
              {this.props.scores.map((game) => (
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
      </div>
    );
  }
}

export default SorsTwo;
