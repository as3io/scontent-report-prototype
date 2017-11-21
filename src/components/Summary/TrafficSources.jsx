import React, { Component } from 'react';
import RadialStackedChart from '../Chart/RadialStacked';

class TrafficSources extends Component {
  render() {
    return (
      <div className="col">
        <RadialStackedChart data={this.props.data} />
        <h4 className="small text-muted">Traffic Source Distribution</h4>
      </div>
    );
  }
}

export default TrafficSources;
