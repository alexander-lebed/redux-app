// @flow
import * as Immutable from 'immutable';
import type { Action, State } from '../../types';
import { ADD_LOCATION, UPDATE_DATA, REMOVE_LOCATION } from '../actions/weather-actions';

const initialState = Immutable.Map({
    locations: Immutable.List([
        Immutable.Map({ id: '9hrptuontk1', city: 'Odessa', country: 'Ukraine', temp: 0, isDeleted: false }),
        Immutable.Map({ id: 't4t6hhe6bf2', city: 'New York', country: 'United States', temp: 0, isDeleted: false }),
        Immutable.Map({ id: 'mwev5gwa8p3', city: 'Valencia', country: 'Spain', temp: 0, isDeleted: true }),
        Immutable.Map({ id: 'od7bvnqj6x4', city: 'London', country: 'Great Britain', temp: 0, isDeleted: true }),
        Immutable.Map({ id: '6237op5obl5', city: 'San Francisco', country: 'United States', temp: 0, isDeleted: true })
    ])
});

const reducer = (state: State = initialState, action: Action): State => {
    const findIndexById = id => state.get('locations').findIndex(t => t.get('id') === id);
    switch (action.type) {
        case ADD_LOCATION: {
            const index = findIndexById(action.payload);
            if (index !== -1) {
                const locations = state.get('locations').update(index, t => t.set('isDeleted', false));
                return state.set('locations', locations);
            }
            return state;
        }
        case UPDATE_DATA: {
            return state.merge(action.payload);
        }
        case REMOVE_LOCATION: {
            const index = findIndexById(action.payload);
            if (index !== -1) {
                const locations = state.get('locations').update(index, t => t.set('isDeleted', true));
                return state.set('locations', locations);
            }
            return state;
        }
        default:
            return state;
    }
};

export default reducer;
