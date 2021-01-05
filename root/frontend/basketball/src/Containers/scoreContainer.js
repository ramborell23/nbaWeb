import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../Actions/index.js";
import Scores from "../Components/Scores.js";
import CurrentScores from "../Components/CurrentScores.js";


class ScoresCon extends React.Component {
    render() {
      console.log("ScoresCon==>", this.props.loadScores);
      
        return (
          <div>
            {/* <button handleClick={this.props.loadColor}>Outside Scores</button> */}
            <br />
            {/* <CurrentScores
              loadScores={this.props.loadScores}
              // handleClick={this.props.loadScores}
              scores={this.props.scores}
            ></CurrentScores> */}
            Current Scores
            <br />
            <br />
            {/* <Scores handleClick={this.props.loadScores} scores={this.props.scores}></Scores> */}
          </div>
        );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, actionCreators)(ScoresCon);
