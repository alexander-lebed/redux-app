// @flow
import { Map } from 'immutable';


export type Action = {type: string, payload: any};
export type State = Map<string, any>;
export type Dispatch = (action: Action) => void;

export type User = {
    username: string,
    email: string,
    password: string
}