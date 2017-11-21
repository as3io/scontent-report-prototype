import React, { Component } from 'react';
import { timeFormat } from 'd3-time-format';

const format = timeFormat('%B %e %Y');

class Title extends Component {
  render() {
    const { name, start, end } = this.props;
    return (
      <div className="row">
        <div className="col">
          <h1 className="display-3 text-center">{ name }</h1>
          <h5 className="display-5 text-muted text-center">
            <span className="date">{ format(start) }</span> to <span className="date">{ format(end) }</span>
          </h5>
        </div>
      </div>
    );
  }
}

export default Title;
