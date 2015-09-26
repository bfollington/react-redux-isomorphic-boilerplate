import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from 'actions/CounterActions';
import Counter from 'components/Counter';

import { addTodo } from "actions/TodoActions";
import Todo from "models/Todo";

import {Link} from "react-router";

/**
 * Redux connecting to the Main React application entry-point for both the server and client.
 */
@connect(
  state => ({
    counter: state.counter,
    todos: Object.values(state.Todo.items)
  }),
  dispatch => ({
    dispatch
  })
)
export default class Main extends React.Component {
  /**
   * Runs on server and client.
   */
  componentWillMount() {

  }

  onAddTodo() {
    this.props.dispatch(addTodo(new Todo({text: "hi"})));
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
        <Link to="/another">Test</Link>
        <br />
        <button onClick={this.onAddTodo.bind(this)}>New Todo</button>
        {
          this.props.todos.map( todo => {
            return (<p key={Math.random()}>{todo.data.get("text")}</p>);
          })
        }
      </div>
    );
  }

}
