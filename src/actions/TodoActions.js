import {ADD_TODO, REMOVE_TODO, UPDATE_TODO} from './actionTypes';

export function addTodo(todo) {
  return { type: ADD_TODO, todo };
}

export function updateTodo(id, todo) {
    return { type: UPDATE_TODO, id, todo };
}

export function removeTodo(id) {
  return { type: REMOVE_TODO, id };
}
