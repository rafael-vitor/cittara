import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { getPredictions } from './fetches';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

class App extends Component {
  state = {
    predictions: {},
    loading: true,
  }

  async componentDidMount() {
    const predictions = await getPredictions()

    this.setState({
      predictions: this.parse(predictions),
      loading: false,
    });
  }

  parse = (d) => (
    d.services.filter(i => i.routeCode === '1114')
  )

  renderPredictions = () => (
    this.state.predictions.map(i => (
      <div key={i.routeCode}>
        <div>
          <div> { i.routeCode } </div>
          <div> { i.routeMnemonic } </div>
        </div>
        {
          i.vehicles.map(v => (
            <div key={v.prediction}>
              {Math.round(v.prediction / 60)}
            </div>
          ))
        }
      </div>
    ))
  )

  render() {
    const { loading, predictions } = this.state;
    return (
      <div className="App">
      { loading && <img src={logo} className="App-logo" alt="logo" /> }
      { !loading &&
        this.renderPredictions()
      }
      </div>
    );
  }
}

export default App;
