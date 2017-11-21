import React, { Component } from 'react';
// import Animate from 'react-move/Animate';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import './BivariateArea.css';

const margin = {top: 20, right: 20, bottom: 30, left: 50};

class BivariateArea extends Component {
  state = { data: [], width: 960, height: 500 };

  componentDidMount() {
    const { width, height } = this.props;

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    const line = d3.area().curve(d3.curveBasis).x(d => x(d.date)).y(d => y(d.identified));
    const area = d3.area().curve(d3.curveBasis).x(d => x(d.date)).y1(d => y(d.identified));

    const { data } = this.props;

    const svg = d3.select(ReactDOM.findDOMNode(this));

    x.domain(d3.extent(data, d => d.date));
    y.domain([
      d3.min(data, d => Math.min(d.identified, d.views)),
      d3.max(data, d => Math.max(d.identified, d.views)),
    ]);

    svg.datum(data);

    svg.append('clipPath').attr('id', 'clip-below')
      .append('path').attr('d', area.y0(height));

    svg.append('clipPath').attr('id', 'clip-above')
      .append('path').attr('d', area.y0(0));

    svg.append('path')
      .attr('class', 'area above')
      .attr('clip-path', 'url(#clip-above)')
      .attr('d', area.y0(d => y(d.views)));

    svg.append('path')
      .attr('class', 'area below')
      .attr('clip-path', 'url(#clip-below)')
      .attr('d', area);

    svg.append('path')
      .attr('class', 'line')
      .attr('d', line);

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    svg.append('g').attr('class', 'y axis').call(yAxis)
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('<span class="y0-label">Identified</span> vs <span class="y1-label">Total</span> Views');
  }

  render() {
    const { width, height } = this.props;
    const styles = { overflow: 'visible', marginBottom: '1em', width, height }
    return (
      <svg className="bivariate-area" style={styles}>
        <g transform={`translate(${margin.left},${margin.top})`} />
      </svg>
    );
  }
}


BivariateArea.defaultProps = {
  width: 960 - margin.left - margin.right,
  height: 500 - margin.top - margin.bottom,
}

export default BivariateArea;
