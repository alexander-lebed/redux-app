// @flow
import type { Element } from 'react';
import { Map } from 'immutable';


export type Action = {type: string, payload: any};
export type State = Map<string, any>;
export type Dispatch = (action: Action) => void;

export type User = {
    _id: string,
    username: string,
    email: string,
    password: string,
    online: boolean,
    lastTime: number
}

export type Alert = {
    uid: string,
    message: string | Element<any>,
    type: 'success' | 'info' | 'danger' | 'warning' | 'dialog',
    timeout?: number
}