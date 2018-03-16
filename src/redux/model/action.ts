import { SettingActionType } from './setting-action-type';

export interface Action<T> {
    type: SettingActionType;
    payload: T;
}
