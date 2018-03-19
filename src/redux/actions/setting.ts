import { Action, SettingActionType, Setting } from '../model';

export function setSetting(setting: Setting): Action<Setting> {
    return {
        type: SettingActionType.SET_SETTING,
        payload: setting
    };
}
