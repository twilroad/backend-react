
import { combineReducers } from 'redux';
import * as todoReducder from './todo';
import { Setting, Todo } from '../model/model';

export interface RootState {
  todoList: Array<Todo>;
  settings: Array<Setting>;
}

export default combineReducers<RootState>({
  ...todoReducder
});