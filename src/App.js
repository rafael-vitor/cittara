import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { getPredictions } from "./fetches";

class App extends Component {
  state = {
    predictions: {},
    loading: true,
    fetching: false,
  };


  async componentDidMount() {
    await this.fetchData();
    setInterval(() => this.fetchData(), 2000);
    this.setState({
      loading: false
    });
  }

  fetchData = async () => {
    this.setState({ fetching: true });
    const predictionsT = this.parse(await getPredictions(1000002049), '1114');
    const predictionsM = this.parse(await getPredictions(1000001882), '1062');
    const predictionsP = this.parse(await getPredictions(1000001874), '1114');

    predictionsT[0].routeMnemonic = 'Pernambués x Pituba (Tancredo)'
    predictionsP[0].routeMnemonic = 'Pernambués x Pituba (Pernambués)'

    const predictions = [
      ...predictionsT,
      ...predictionsM,
      ...predictionsP,
    ];

    console.log('get data')

    this.setState({
      predictions: predictions,
      fetching: false,
    });
  }

  parse = (d, rCode) => d.services.filter(i => (i.routeCode === rCode && !!i.vehicles.length));

  renderPredictions = () => (
    <div style={{ marginTop: 40 }}>
      <div style={{ height: 40, marginBottom: 20 }}>
        {
          this.state.fetching &&
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{ height: 40 }}
          />
        }
      </div>
      <table className="table-fill">
        <thead>
          <tr>
            <th className="text-left"> linha: </th>
            <th colSpan={3} className="text-left"> previsão </th>
          </tr>
        </thead>
        <tbody className="table-hover">
          {
            this.state.predictions.map((predic, idx) => (
              <tr key={idx}>
                <td className="text-left">{predic.routeMnemonic}</td>

                {
                  predic.vehicles.map((vehic, idx) => (
                    <td key={idx} className="text-left">{Math.round(vehic.prediction / 60)} min</td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );

  render() {
    const { loading } = this.state;
    return (
      <div className="App">
        {loading && <img src={logo} className="App-logo" alt="logo" />}
        {!loading && this.renderPredictions()}
      </div>
    );
  }
}

export default App;
