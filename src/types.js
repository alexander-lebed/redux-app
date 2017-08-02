// @flow
import {List, Map} from 'immutable';


export type Action = {type: string, payload: any};
export type State = List<Map<string, any>>;
export type Dispatch = (action: Action) => void;