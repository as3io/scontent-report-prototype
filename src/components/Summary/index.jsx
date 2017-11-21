import React, { Component } from 'react';
import Title from './Title';
import ViewsIdentified from './ViewsIdentified';
import ViewsTotal from './ViewsTotal';
import TrafficSummary from './TrafficSummary';
import TrafficSources from './TrafficSources';

class Summary extends Component {
  render() {
    const { views, identified } = this.props.views;

    return (
      <section id="summary" className="mb-5">
        <Title name={this.props.name} start={this.props.start} end={this.props.end} />

        <div className="row text-center mt-5">
          <ViewsTotal value={views} />
          <ViewsIdentified value={identified} />
        </div>
        <div className="row text-center mt-4 mb-5">
          <TrafficSources data={this.props.traffic.distribution} />
        </div>
        <div className="row text-center mt-4 mb-5">
          <TrafficSummary data={this.props.traffic.summary} />
        </div>
      </section>
    );
  }
}

export default Summary;
