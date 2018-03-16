import { combineReducers } from 'redux';
import { Setting } from '../model';
import * as SettingReducder from './setting';

export interface RootState {
    settings: Array<Setting>;
}

export default combineReducers<RootState>({
    ...SettingReducder,
});
