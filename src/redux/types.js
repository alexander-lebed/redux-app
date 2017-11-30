// @flow
import { Map } from 'immutable';


export type Action = {type: string, payload: any};
export type State = Map<string, any>;
export type Dispatch = (action: Action) => void;
