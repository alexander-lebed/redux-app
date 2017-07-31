import {List, Map} from 'immutable';
import uid from './helpers/id-generator';


const initCities = List([
    Map({id: uid(), city: 'Odessa', degrees: 27, isDeleted: false}),
    Map({id: uid(), city: 'New York', degrees: 24, isDeleted: false})
])

const reducer = (state = initCities, action) => {
    switch(action.type) {
        case 'ADD_CITY':
            return state.set(state.size, action.payload);
        case 'REMOVE_CITY':
            const index = state.findIndex(t => t.get('id') === action.payload);
            return index !== -1 ? state.update(index, t => t.set('isDeleted', true)) : state;
        default:
            return state;
    }
}

export default reducer;