// @flow
import { List, Map } from 'immutable';
import type { Action, State } from '../../types';
import { ADD_TODO, UPDATE_TODO, TOGGLE_TODO, REMOVE_TODO } from '../actions/todo-actions';


const initialState = Map({
    todos: List([
        Map({id: 'klhjh3rr2', isDone: true, text: 'nice notifications', isDeleted: false}),
        Map({id: 'fdf3aef3f', isDone: true, text: 'Log in page', isDeleted: false}),
        Map({id: 'ldfwswe3e', isDone: false, text: 'implement Back-End with some Database', isDeleted: false}),
        Map({id: 'abs3ae2fq', isDone: false, text: 'Messenger', isDeleted: false }),
        Map({id: 'ks3324fdu', isDone: false, text: 'UX/UI', isDeleted: false}),
        Map({id: '0e1wewm10', isDone: false, text: 'get rid from ImmutableJS ?', isDeleted: false}),
        Map({id: '3re90gftt', isDone: false, text: 'deploy the app to AWS or Heroku', isDeleted: false})
    ])
});

const reducer = (state: State = initialState, action: Action): State => {
    const findIndexById = (id: string) => state.get('todos').findIndex(t => t.get('id') === id);
    switch (action.type) {
        case ADD_TODO: {
            const todos = state.get('todos').set(state.get('todos').size, action.payload);
            return state.set('todos', todos);
        }
        case UPDATE_TODO: {
            const index = findIndexById(action.payload.id);
            if (index !== -1) {
                const todos = state.get('todos').update(index, t => t.set('text', action.payload.text.trim()));
                return state.set('todos', todos);
            }
            return state;
        }
        case TOGGLE_TODO: {
            const index = findIndexById(action.payload);
            if (index !== -1) {
                const todos = state.get('todos').update(index, t => t.update('isDone', isDone => !isDone));
                return state.set('todos', todos);
            }
            return state;
        }
        case REMOVE_TODO: {
            const index = findIndexById(action.payload);
            if (index !== -1) {
                const todos = state.get('todos').update(index, t => t.set('isDeleted', true));
                return state.set('todos', todos);
            }
            return state;
        }
        default:
            return state;
    }
};

export default reducer;
