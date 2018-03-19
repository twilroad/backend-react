import { SettingActionType } from './setting-action-type';
import { HostsActionType } from './hosts-action-type';

export interface Action<T> {
    type: SettingActionType | HostsActionType;
    payload: T;
}
