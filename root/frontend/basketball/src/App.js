// import logo from './logo.svg';
import {BrowserRouter as Router, Switch, Route,Link} from "react-router-dom";
import basket from './basket.png';
import './App.css';
import FormPost from './Components/FormPost.js';
import Home from './Components/Home.js';
import About from './Components/About.js';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div>
            <ul
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                listStyleType: "none",
                color: "white",
                textDecoration: "none",
              }}
            >
              <li style={{ color: "white", textDecoration: "none" }}>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>{/* <Link to="/dashboard">Dashboard</Link> */}</li>
            </ul>
          </div>
        </header>
        {/* <img src={basket} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <hr />
        {/* <FormPost /> */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          {/* <Route path="/dashboard">
            <Dashboard />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;