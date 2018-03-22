import createReducer from './createReducer';
import { SettingActionType } from '../model';
import { Action, Setting } from '../model';

export const settings = createReducer([], {
    [SettingActionType.SET_SETTING](state: Array<Setting>, action: Action<Setting>) {
        return [
            ...state,
            action.payload,
        ];
    }
});
