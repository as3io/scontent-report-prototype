import React, { Component } from 'react';
// import Animate from 'react-move/Animate';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import './RadialStacked.css';

const margin = {top: 20, right: 20, bottom: 30, left: 50},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom,
  innerRadius = 120,
  outerRadius = Math.min(width, height) * 0.6
;

const scaleRadial = () => {
  const linear = d3.scaleLinear();
  const square = (x) => x * x;

  function scale(x) {
    return Math.sqrt(linear(x));
  }

  scale.domain = function(_) {
    return arguments.length ? (linear.domain(_), scale) : linear.domain();
  };

  scale.nice = function(count) {
    return (linear.nice(count), scale);
  };

  scale.range = function(_) {
    return arguments.length ? (linear.range(_.map(square)), scale) : linear.range().map(Math.sqrt);
  };

  scale.ticks = linear.ticks;
  scale.tickFormat = linear.tickFormat;

  return scale;
}

class RadialStacked extends Component {
  state = { data: [] };

  svgStyles = {
    width,
    height,
    // overflow: 'visible',
    marginBottom: '1em',
  }

  componentDidMount() {
    const g = d3.select(ReactDOM.findDOMNode(this)).append('g').attr('transform', `translate(${width / 2},${height * 0.61})`);

    const x = this.props.x;
    const y = this.props.y;
    const z = this.props.z;

    const { data } = this.props;
    // fake d3 csv.parse
    data.columns = Object.keys(data[0]);
    data.columns.splice(-1);

    x.domain(data.map(d => d.type));
    y.domain([0, d3.max(data, d => d.total)]);
    z.domain(data.columns.slice(1));

    g.append('g')
    .selectAll('g')
    .data(d3.stack().keys(data.columns.slice(1))(data))
    .enter().append('g')
      .attr('fill', d => z(d.key))
    .selectAll('path')
    .data(d => d)
    .enter().append('path')
      .attr('d', d3.arc()
          .innerRadius(d => y(d[0]))
          .outerRadius(d => y(d[1]))
          .startAngle(d => x(d.data.type))
          .endAngle(d => x(d.data.type) + x.bandwidth())
          .padAngle(0.01)
          .padRadius(innerRadius));

  var label = g.append('g')
    .selectAll('g')
    .data(data)
    .enter().append('g')
      .attr('text-anchor', 'middle')
      .attr('transform', d => 'rotate(' + ((x(d.type) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ')translate(' + innerRadius + ',0)');

  label.append('line')
      .attr('x2', -5)
      .attr('stroke', '#000');

  label.append('text')
      .attr('transform', d => (x(d.type) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI ? 'rotate(90)translate(0,16)' : 'rotate(-90)translate(0,-9)')
      .text(d => d.type);

  var yAxis = g.append('g')
      .attr('text-anchor', 'end');

  var yTick = yAxis
    .selectAll('g')
    .data(y.ticks(5).slice(1))
    .enter().append('g');

  yTick.append('circle')
      .attr('fill', 'none')
      .attr('stroke', '#000')
      .attr('stroke-opacity', 0.1)
      .attr('r', y);

  yTick.append('text')
      .attr('x', -6)
      .attr('y', d => -y(d))
      .attr('dy', '0.35em')
      .attr('fill', 'none')
      .attr('stroke', '#000')
      .attr('stroke-opacity', 0.1)
      .attr('stroke-linejoin', 'round')
      .text(y.tickFormat(10, 's'));

  yTick.append('text')
      .attr('x', -6)
      .attr('y', d => -y(d))
      .attr('dy', '0.35em')
      .text(y.tickFormat(10, 's'));


  var legend = g.append('g')
    .selectAll('g')
    .data(data.columns.slice(1).reverse())
    .enter().append('g')
      .attr('transform', (d, i) => 'translate(-40,' + (i - (data.columns.length - 1) / 2) * 20 + ')');

  legend.append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', z);

  legend.append('text')
      .attr('x', 24)
      .attr('y', 9)
      .attr('dy', '0.35em')
      .text(d => d);
  }

  render() {
    return (
      <svg className="radial-stacked" style={this.svgStyles} />
    );
  }
}

RadialStacked.defaultProps = {
  x: d3.scaleBand().range([0, 2 * Math.PI]).align(0),
  y: scaleRadial().range([innerRadius, outerRadius]),
  z: d3.scaleOrdinal().range(['#91cf60', '#fc8d59'])
}

export default RadialStacked;
