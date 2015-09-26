import React from 'react';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from 'actions/CounterActions';
import Counter from 'components/Counter';

/**
 * Redux connecting to the Main React application entry-point for both the server and client.
 */
@connect(state => ({
  counter: state.counter,
}))

@Radium
export default class Main extends React.Component {
  /**
   * Runs on server and client.
   */
  componentWillMount() {

  }
  /**
   * Runs on server and client.
   */
  render() {
    const repositoryUrl = 'https://github.com/luandro/hapi-universal-redux';
    const avatarSize    = 32;
    const avatarUrl     = (id) => `https://avatars.githubusercontent.com/u/${id}?v=3&s=${avatarSize}`;
    /**
     * These are the Redux and Transmit props.
     */
    const { counter, dispatch } = this.props;
    return (
      <div>
        <h3>Redux counter</h3>
        <Counter counter={counter}  {...bindActionCreators(CounterActions, dispatch)} />
      </div>
    );
  }

}
