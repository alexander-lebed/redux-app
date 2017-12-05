// @flow
import type { Action, State } from '../../types';


export const ADD_LOCATION = 'ADD_LOCATION';
export const UPDATE_DATA = 'UPDATE_DATA';
export const REMOVE_LOCATION = 'REMOVE_LOCATION';

export const addLocation = (id: string): Action => ({
    type: ADD_LOCATION,
    payload: id
});

export const updateData = (state: State): Action => ({
    type: UPDATE_DATA,
    payload: state
});

export const removeLocation = (id: string): Action => ({
    type: REMOVE_LOCATION,
    payload: id
});
