// @flow
import type {Action, State} from '../types';


export const addLocation = (id: string): Action => {
    return {
        type: 'ADD_LOCATION',
        payload: id
    }
}

export const updateLocations = (locations: State): Action => {
    return {
        type: 'UPDATE_LOCATIONS',
        payload: locations
    }
}

export const removeLocation = (id: string): Action => {
    return {
        type: 'REMOVE_LOCATION',
        payload: id
    }
}