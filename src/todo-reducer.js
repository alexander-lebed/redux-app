import {List, Map} from 'immutable';
import uid from './helpers/id-generator';

const initTodos = List([
    Map({id: uid(), isDone: true, text: 'use Redux', isDeleted: false}),
    Map({id: uid(), isDone: true,  text: 'use ImmutableJS', isDeleted: false}),
    Map({id: uid(), isDone: true, text: 'rebuild on code changes', isDeleted: false}),
    Map({id: uid(), isDone: true, text: 'use react-bootstrap', isDeleted: false}),
    Map({id: uid(), isDone: false,  text: 'push to Github', isDeleted: false}),
    Map({id: uid(), isDone: false,  text: 'add Router', isDeleted: false}),
    Map({id: uid(), isDone: false, text: 'add type checking with Flow', isDeleted: false}),
    Map({id: uid(), isDone: false, text: 'test with Jest', isDeleted: false}),
    Map({id: uid(), isDone: false, text: 'add linting with ESLint', isDeleted: false})
]);


const reducer = (state = initTodos, action) => {
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