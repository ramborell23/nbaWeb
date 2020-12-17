// import logo from './logo.svg';
import React from "react";

import {BrowserRouter as Router, Switch, Route,Link} from "react-router-dom";
import basket from './basket.png';
import './App.css';
import FormPost from './Components/FormPost.js';
import Home from './Components/Home.js';
import About from './Components/About.js';
import Scores from "./Components/Scores.js";
import Stats from "./Components/Stats.js";
import Schedule from "./Components/Schedule.js";
import Standings from "./Components/Standings.js";
import Fantasy from "./Components/Fantasy.js";
import Scorecon from "./Containers/scoreContainer.js";
// import Boxcon from "./Containers/box-container.js";
import Boxcon from "./Containers/boxContainer.js";
import { connect } from "react-redux";
import * as actionCreators from "./Actions/index.js";


// /Containers/box-container.js


class App extends React.Component {
  componentDidMount() {
    console.log('COmponent Mounted')
    this.props.loadScores()
  }
  render() {
    // setTimeout(this.props.loadScores(), 60000);
    console.log('APPPP', this.props)
    // setTimeout(() => {
      
    // }, 100);
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <div>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  listStyleType: "none",
                  color: "white",
                  textDecoration: "none",
                  margin: 15,
                }}
              >
                {/* <BoxCon/> */}
                <li style={{ color: "white", textDecoration: "none" }}>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/scores">Scores</Link>
                </li>
                <li>
                  <Link to="/stats">Stats</Link>
                </li>
                <li>
                  <Link to="/schedule">Schedule</Link>
                </li>
                <li>
                  <Link to="/standings">Standings</Link>
                </li>
                <li>
                  <Link to="/fantasy">Fantasy</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>{/* <Link to="/dashboard">Dashboard</Link> */}</li>
              </ul>
            </div>
          </header>

          <hr />
          {/* <FormPost /> */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/scores">
              <Scorecon />
            </Route>
            <Route path="/schedule">
              <Boxcon />
            </Route>
            <Route path="/stats">
              <Stats />
            </Route>
            <Route path="/standings">
              <Standings />
            </Route>
            <Route path="/fantasy">
              <Fantasy />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}




const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, actionCreators)(App);
