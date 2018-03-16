import { combineReducers } from 'redux';
import { Setting } from '../model';
import * as SettingReducder from './setting';

export interface RootState {
    hosts: string;
    settings: Array<Setting>;
}

export default combineReducers<RootState>({
    ...SettingReducder,
});
