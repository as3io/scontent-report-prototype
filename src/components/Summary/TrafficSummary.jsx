import React, { Component } from 'react';
import BivariateAreaChart from '../Chart/BivariateArea';

class TrafficSummary extends Component {
  render() {
    return (
      <div className="col">
        <BivariateAreaChart data={this.props.data} />
        <h4 className="small text-muted">Overall Traffic</h4>
      </div>
    );
  }
}

export default TrafficSummary;
