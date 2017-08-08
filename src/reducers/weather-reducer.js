// @flow
import {List, Map} from 'immutable';
import type {Action, State} from '../types';
import uid from '../helpers/id-generator';


const initLocations = List([
    Map({id: uid(), city: 'Odessa', country: "Ukraine", temp: 0, isDeleted: false}),
    Map({id: uid(), city: 'New York', country: "United States", temp: 0, isDeleted: false}),
    Map({id: uid(), city: 'Valencia', country: "Spain", temp: 0, isDeleted: true}),
    Map({id: uid(), city: 'London', country: "Great Britain", temp: 0, isDeleted: true}),
    Map({id: uid(), city: 'San Francisco', country: "United States", temp: 0, isDeleted: true})
])

const reducer = (state: State = initLocations, action: Action): State => {
    const findIndexById = id => state.findIndex(t => t.get('id') === id);
    switch(action.type) {
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
}

export default reducer;