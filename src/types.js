// @flow
import type { Element } from 'react';

export type Action = {type: string, payload: any};
export type State = any;
export type Dispatch = (action: Action | Function) => void;

export type User = {
    _id: string,
    username: string,
    email: string,
    password: string,
    online: boolean,
    lastTime: number | null
}

export type Alert = {
    uid: string,
    message: string | Element<any>,
    type: 'success' | 'info' | 'danger' | 'warning',
    timeout?: number
}

export type Message = {
    _id?: string,
    from: {_id: string, username: string},
    text: string,
    timestamp: number | null,
    read: boolean,
    deleted: boolean
}

export type Conversation = {
    _id: string,
    users: Array<{_id: string, username: string}>,
    messages: Array<Message>,
    timestamp: number | null
}