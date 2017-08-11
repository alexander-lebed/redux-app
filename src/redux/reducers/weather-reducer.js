// @flow
import * as Immutable from 'immutable';
import type { Action, State } from '../types';


const initialState = Immutable.List([
    Immutable.Map({ id: '9hrptuontk1', city: 'Odessa', country: 'Ukraine', temp: 0, isDeleted: false }),
    Immutable.Map({ id: 't4t6hhe6bf2', city: 'New York', country: 'United States', temp: 0, isDeleted: false }),
    Immutable.Map({ id: 'mwev5gwa8p3', city: 'Valencia', country: 'Spain', temp: 0, isDeleted: true }),
    Immutable.Map({ id: 'od7bvnqj6x4', city: 'London', country: 'Great Britain', temp: 0, isDeleted: true }),
    Immutable.Map({ id: '6237op5obl5', city: 'San Francisco', country: 'United States', temp: 0, isDeleted: true })
]);

const reducer = (state: State = initialState, action: Action): State => {
    const findIndexById = id => state.findIndex(t => t.get('id') === id);
    switch (action.type) {
    case 'ADD_LOCATION': {
        const index = findIndexById(action.payload);
        return index !== -1 ? state.update(index, t => t.set('isDeleted', false)) : state;
    }
    case 'UPDATE_LOCATIONS': {
        return action.payload;
    }
    case 'REMOVE_LOCATION': {
        const index = findIndexById(action.payload);
        return index !== -1 ? state.update(index, t => t.set('isDeleted', true)) : state;
    }
    default:
        return state;
    }
};

export default reducer;
