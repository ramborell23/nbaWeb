import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../Actions/index.js";
import Box from "../Components/Box.js";
import Scores from "../Components/Scores.js";
import SorsTwo from "../Components/SorsTwo.js";
import CurrentScores from "../Components/SorsTwo.js";

class BoxCon extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
      <CurrentScores handleClick={this.props.loadScores} color={this.props.scores}></CurrentScores>
      {/* <Sors bnm,[poiytrewandleClick={this.props.loadScores} color={this.props.color}></Box> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, actionCreators)(BoxCon);
