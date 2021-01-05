import React from "react";
import logoDict from "../Assets/logoDict";
import loadGif from "../Assets/loadGif.gif";
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
    // setInterval(this.incrementScores, 90000);
  }

  render() {
    const { count } = this.state;
    console.log("this.props.scores=====>", this.props);
    // Checks for scores updates
    // setInterval(function () {
    //   console.log(
    //     time.toLocaleString("en-US", {
    //       hour: "numeric",
    //       minute: "numeric",
    //       hour12: true,
    //     })
    //   );
    //   console.log("Reloaded", count, this.props);
    // }, 60000);

    return (
      <div className="wrapper">
        <div
          style={{
            backgroundColor: `${this.props.color}`,
          }}
          className="box"
        >
          {/* <button
            onClick={() => {
              this.props.handleClick();
            }}
          >
            Change Score
          </button> */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              overflowX: "auto",
            }}
          >
            {this.props.scores === undefined ||
            this.props.scores.length == 0 ? (
              <div>
                <h1>Loading...</h1>

                <img src={loadGif} alt="loading..." style={{height:'280px', width:'120px'}} />
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  overflowX: "auto",
                  // marginRight: "15px",
                  alignItems: "center",
                  // justifyContent: "space-between",
                }}
              >
                {" "}
                {this.props.scores.map(function (game) {
                  return (
                    <div
                      style={{ display: "flex", flexDirection: "row" }}
                      key={game.id}
                    >
                      {/* {console.log(logoDict['Brooklyn Nets'])} */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "250px",
                          height: "100%",
                          marginTop: "20px",
                          marginBottom: "0px",
                          paddingLeft: "25px",
                        }}
                      >
                        {/* {game.Date} */}
                        <label style={{ fontSize: 14 }}>
                          {game["Start (ET)"]}
                        </label>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <img
                            style={{ height: 30, width: 30 }}
                            src={logoDict[`${game.game.homeTeamName}`].logo}
                            alt="Team Logo"
                          />
                          <label style={{ fontSize: 14 }}>
                            {game.game.homeTeamName}
                            <br />
                            <hr />
                            {game.game.homeTotal}
                            <hr />
                            {game.game.timeQuarter}
                            <hr />
                            {game.game.awayTotal}
                            <hr />
                            {/* <br /> */}
                            {game.game.awayTeamName}{" "}
                          </label>
                          <img
                            style={{
                              height: 30,
                              width: 30,
                              alignSelf: "flex-end",
                            }}
                            src={logoDict[`${game.game.awayTeamName}`].logo}
                            alt="Team Logo"
                          />
                          <br /> <br />
                          <hr />
                        </div>
                      </div>
                    </div>
                  );
                })}{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentScores;
