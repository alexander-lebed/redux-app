// @flow
import {List, Map} from 'immutable';
import type {Action, State} from '../types';
import uid from '../helpers/id-generator';


const initTodos = List([
    Map({id: uid(), isDone: true, text: 'use Redux', isDeleted: false}),
    Map({id: uid(), isDone: true, text: 'use ImmutableJS', isDeleted: false}),
    Map({id: uid(), isDone: true, text: 'rebuild on code changes', isDeleted: false}),
    Map({id: uid(), isDone: true, text: 'use react-bootstrap', isDeleted: false}),
    Map({id: uid(), isDone: true, text: 'push to Github', isDeleted: false}),
    Map({id: uid(), isDone: true, text: 'add Router', isDeleted: false}),
    Map({id: uid(), isDone: true, text: 'type checking with Flow', isDeleted: false}),
    Map({id: uid(), isDone: false, text: 'fix bug with edit todo', isDeleted: false}),
    Map({id: uid(), isDone: false, text: 'test with Jest', isDeleted: false}),
    Map({id: uid(), isDone: false, text: 'linting with ESLint', isDeleted: false}),
    Map({id: uid(), isDone: false, text: 'log in page', isDeleted: false}),
    Map({id: uid(), isDone: true, text: 'bindActionCreators (Redux)', isDeleted: false}),
    Map({id: uid(), isDone: false, text: 'use cookies or localStorage', isDeleted: false})
]);


const reducer = (state: State = initTodos, action: Action): State => {
    const findIndexById = (id: string) => state.findIndex(t => t.get('id') === id);
    switch (action.type) {
        case 'ADD_TODO':
            return state.set(state.size, action.payload);
        case 'UPDATE_TODO': {
            const index = findIndexById(action.payload.id);
            return index !== -1 ? state.update(index, t => t.set('text', action.payload.text)) : state;
        }
        case 'TOGGLE_TODO': {
            const index = findIndexById(action.payload);
            return index !== -1 ? state.update(index, t => t.update('isDone', isDone => !isDone)) : state;
        }
        case 'REMOVE_TODO': {
            const index = findIndexById(action.payload);
            return index !== -1 ? state.update(index, t => t.set('isDeleted', true)) : state;
        }
        default:
            return state;
    }
}

export default reducer;