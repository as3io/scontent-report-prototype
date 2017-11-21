import React, { Component } from 'react';
import BivariateAreaChart from './Chart/BivariateArea';
import AnimatedNumber from './AnimatedNumber';
import DataTable from './DataTable';

class Traffic extends Component {
  state = {
    referrers: [],
    sequenced: [],
    rate: 0.0
  };

  componentWillMount() {
    const { rate, referrers } = this.props.data;
    window.setTimeout(() => this.setState({ rate, referrers }), 250);
  }

  render() {
    const { label, data: { sequenced } } = this.props;
    const { rate, referrers } = this.state;
    return (
      <section className="mt-5 mb-5">
        <h3>{label}</h3>
        <div className="card-deck text-center">
          <div className="card">
            <p className="card-header">Referrals</p>
            <p className="card-body">
              <DataTable data={referrers} />
            </p>
          </div>
          <div className="card">
            <p className="card-header">Traffic over time</p>
            <p className="card-body">
              <BivariateAreaChart data={sequenced} height={250} width={300} />
            </p>
          </div>
          <div className="card">
            <p className="card-header">Conversion Rate</p>
            <p className="card-body row conversion-rate align-items-center justify-content-center">
              <AnimatedNumber value={rate} format={'.0%'} className={'display-1'} />
            </p>
          </div>
        </div>
      </section>
    );
  }
}

export default Traffic;
