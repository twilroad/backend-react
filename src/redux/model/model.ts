
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export interface Global {
    api: string;
}

export enum ActionType {
    ADD_TODO,
    DELETE_TODO,
    COMPLETE_TODO,
    UNCOMPLETE_TODO,
    SET_GLOBAL,
}

export interface Action<T> {
    type: ActionType;
    payload: T;
}