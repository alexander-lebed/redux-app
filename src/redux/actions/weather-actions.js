// @flow
import type { Action, State } from '../types';


export const addLocation = (id: string): Action => ({
    type: 'ADD_LOCATION',
    payload: id
});

export const updateLocations = (locations: State): Action => ({
    type: 'UPDATE_LOCATIONS',
    payload: locations
});

export const removeLocation = (id: string): Action => ({
    type: 'REMOVE_LOCATION',
    payload: id
});
