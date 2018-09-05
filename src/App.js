import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { getPredictions } from "./fetches";
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";

class App extends Component {
  state = {
    predictions: {},
    loading: true
  };

  async componentDidMount() {
    const predictionsT = this.parse(await getPredictions(1000002049), '1114');
    const predictionsM = this.parse(await getPredictions(1000001882), '1062');
    const predictionsP = this.parse(await getPredictions(1000001874), '1114');

    console.log(predictionsT);

    predictionsT[0].routeMnemonic = 'Pernambués x Pituba (Tancredo)'
    predictionsP[0].routeMnemonic = 'Pernambués x Pituba (Pernambués)'

    const predictions = [
      ...predictionsT,
      ...predictionsM,
      ...predictionsP,
    ];

    console.log(predictions);

    this.setState({
      predictions: predictions,
      loading: false
    });
  }

  parse = (d, rCode) => d.services.filter(i => (i.routeCode === rCode && !!i.vehicles.length));

  renderPredictions = () => (

      <table className="table-fill">
        <thead>
          <tr>
            <th className="text-left"> linha: </th>
            <th colSpan={3} className="text-left"> previsão </th>
          </tr>
        </thead>
        <tbody className="table-hover">
          {
            this.state.predictions.map(i => (
              <tr>
                <td className="text-left">{i.routeMnemonic}</td>

                {
                  i.vehicles.map(v => (
                    <td className="text-left">{Math.round(v.prediction / 60)} min</td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
  );

  render() {
    const { loading, predictions } = this.state;
    return (
      <div className="App">
        {loading && <img src={logo} className="App-logo" alt="logo" />}
        {!loading && this.renderPredictions()}
      </div>
    );
  }
}

export default App;
