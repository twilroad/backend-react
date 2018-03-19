import * as HostsReducder from './hosts';
import * as SettingReducder from './setting';
import { combineReducers } from 'redux';
import { Setting } from '../model';

export interface RootState {
    hosts: string;
    settings: Array<Setting>;
}

export default combineReducers<RootState>({
    ...HostsReducder,
    ...SettingReducder,
});
