
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export interface Setting {
    key: string;
    value: string;
}

export enum ActionType {
    ADD_TODO,
    DELETE_TODO,
    COMPLETE_TODO,
    UNCOMPLETE_TODO,
    SET_SETTING,
}

export interface Action<T> {
    type: ActionType;
    payload: T;
}