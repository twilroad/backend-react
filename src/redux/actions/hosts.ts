import { Action } from '../model';
import { HostsActionType } from '../model/hosts-action-type';

export function setHosts(host: string): Action<string> {
    window.console.log(host);

    return {
        type: HostsActionType.SET_HOSTS,
        payload: host,
    };
}
