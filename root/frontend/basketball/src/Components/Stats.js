import React from "react";

class Stats extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      count: 0,
    };
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://widgets.sports-reference.com/wg.fcgi?css=1&site=bbr&url=%2Fleagues%2FNBA_2021_adj_shooting.html&div=div_adj-shooting";
    script.async = true;
    script.type = "text/javascript";
    console.log(script)
    document.body.appendChild(script);
    console.log('Basketball Referwnce')
  }

  render() {
    // console.log(StatsWidget);

    return <div>Stats</div>;
  }
}

export default Stats;
