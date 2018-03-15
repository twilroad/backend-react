import createReducer from './createReducer';
import { Action, ActionType, Setting, Todo } from '../model/model';

export const todoList = createReducer([], {
    [ActionType.ADD_TODO](state: Array<Todo>, action: Action<Todo>) {
        window.console.log('as', state);

        return [...state, action.payload];
    },
    [ActionType.COMPLETE_TODO](state: Array<Todo>, action: Action<number>) {
        // search after todo item with the given id and set completed to true
        return state.map(t => t.id === action.payload ? { ...t, completed: true } : t);
    },
    [ActionType.UNCOMPLETE_TODO](state: Array<Todo>, action: Action<number>) {
        // search after todo item with the given id and set completed to false
        return state.map(t => t.id === action.payload ? { ...t, completed: false } : t);
    },
    [ActionType.DELETE_TODO](state: Array<Todo>, action: Action<number>) {
        // remove all todos with the given id
        return state.filter(t => t.id !== action.payload);
    },
});

export const settings = createReducer([], {
    [ActionType.SET_SETTING](state: Array<Setting>, action: Action<Setting>) {
        window.console.log('settings', state);

        return [...state, action.payload];
    }
});
