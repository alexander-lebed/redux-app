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
    Map({id: uid(), isDone: false, text: 'test with Jest', isDeleted: false}),
    Map({id: uid(), isDone: false, text: 'linting with ESLint', isDeleted: false}),
    Map({id: uid(), isDone: false, text: 'log in page', isDeleted: false}),
    Map({id: uid(), isDone: false, text: 'bindActionCreators (Redux)', isDeleted: false}),
    Map({id: uid(), isDone: false, text: 'use cookies or localStorage', isDeleted: false})
]);


const reducer = (state: State = initTodos, action: Action): State => {
    switch (action.type) {
        case 'ADD_TODO':
            return state.set(state.size, action.payload);
        case 'TOGGLE_TODO':
            return state.map(todo => {
                if (todo.get('id') === action.payload) {
                    return todo.update('isDone', isDone => !isDone);
                }
                return todo;
            });
        case 'REMOVE_TODO':
            return state.map(todo => {
                if (todo.get('id') === action.payload) {
                    return todo.update('isDeleted', isDeleted => true);
                }
                return todo;
            });
        default:
            return state;
    }
}

export default reducer;