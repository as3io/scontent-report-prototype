import React, { Component } from 'react';

import sampleData from './sample-data.json';

import Summary from './components/Summary';
import Traffic from './components/Traffic';

class App extends Component {
  render() {

    sampleData.start = Date.parse(sampleData.start);
    sampleData.end = Date.parse(sampleData.end);
    sampleData.traffic.summary = sampleData.traffic.summary.map((el) => Object.assign({}, el, { date: Date.parse(el.date) }));
    sampleData.web.sequenced = sampleData.web.sequenced.map((el) => Object.assign({}, el, { date: Date.parse(el.date) }));
    sampleData.emarketing.sequenced = sampleData.emarketing.sequenced.map((el) => Object.assign({}, el, { date: Date.parse(el.date) }));
    sampleData.social.sequenced = sampleData.social.sequenced.map((el) => Object.assign({}, el, { date: Date.parse(el.date) }));

    return (
      <div className="container">
        <Summary {...sampleData} />
        <hr className="mt-5 mb-5"/>

        <Traffic label={'Web'} data={sampleData.web} />

        <Traffic label={'E-Marketing'} data={sampleData.emarketing} />

        <Traffic label={'Social'} data={sampleData.social} />
      </div>
    );
  }
}

export default App;
