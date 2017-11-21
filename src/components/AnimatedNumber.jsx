import React, { Component } from 'react';
import Animate from 'react-move/Animate';
import { easeExpOut as easingAnimation } from 'd3-ease';
import { interpolateNumber as interpolator } from 'd3-interpolate';
import { format as formatter } from 'd3-format';

class AnimatedNumber extends Component {
  state = { value: 0 };

  render() {
    const { format, className } = this.props;
    return (
      <Animate
        start={{
          value: 0,
          d: interpolator,
        }}
        update={() => ({
          value: interpolator(0, this.props.value),
          timing: { duration: 2500, ease: easingAnimation }
        })}
      >
        {(state) => {
          return (
            <h4 className={className}>{ formatter(format)(state.value) }</h4>
          )
        }}
      </Animate>
    );
  }
}

AnimatedNumber.defaultProps = {
  format: ',d',
  className: ''
}

export default AnimatedNumber;
