import React from 'react';

export default class Counter extends React.Component {
  static propTypes = {
    counter: React.PropTypes.number.isRequired,
    plus: React.PropTypes.func.isRequired,
    minus: React.PropTypes.func.isRequired,
  }

  render() {
    const count = this.props.counter.toString();
    const {plus, minus} = this.props;

    return (
      <div>
        <span>{count}</span>
        <div>
          <button onClick={plus}>+</button>
          <button onClick={minus}>-</button>
        </div>
      </div>
    );
  }
}
