import React, { Component } from 'react';
import AnimatedNumber from '../AnimatedNumber';

class ViewsIdentified extends Component {
  state = { value: 0 };

  componentWillMount() {
    const { value } = this.props;
    window.setTimeout(() => this.setState({ value }), 250);
  }

  render() {
    return (
      <div className="col">
        <AnimatedNumber value={this.props.value} />
        <h4 className="small text-muted">Identified Views</h4>
      </div>
    );
  }
}

export default ViewsIdentified;
