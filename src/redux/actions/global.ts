import { Action, ActionType, Global } from '../model/model';

export function addTodo(global: Global): Action<Global> {
    return {
        type: ActionType.SET_GLOBAL,
        payload: global
    };
}
