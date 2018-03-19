import createReducer from './createReducer';
import { HostsActionType } from '../model/hosts-action-type';
import { Action } from '../model';

export const settings = createReducer('', {
    [HostsActionType.SET_HOSTS](state: string, action: Action<string>) {
        return action.payload;
    }
});
