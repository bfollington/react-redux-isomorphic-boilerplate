import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from 'actions/CounterActions';
import Counter from 'components/Counter';

export default class Another extends React.Component {
  /**
   * Runs on server and client.
   */
  componentWillMount() {

  }
  /**
   * Runs on server and client.
   */
  render() {
    /**
     * These are the Redux and Transmit props.
     */
    return (
      <div>
        <h3>Hi :)</h3>
      </div>
    );
  }

}
