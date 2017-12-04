// @flow
import { List, Map } from 'immutable';
import type { Action, State } from '../types';
import { ADD_TODO, UPDATE_TODO, TOGGLE_TODO, REMOVE_TODO } from '../actions/todo-actions';


const initialState = Map({
    todos: List([
        Map({ id: 'jhdf7dj3ff', isDone: true, text: 'use Redux', isDeleted: false }),
        Map({ id: '6dfkl34dz', isDone: true, text: 'use ImmutableJS', isDeleted: false }),
        Map({ id: 'jgf02klsd', isDone: true, text: 'rebuild on code changes', isDeleted: false }),
        Map({ id: 'j2sl4e2sq', isDone: true, text: 'use react-bootstrap', isDeleted: false }),
        Map({ id: 'jd81kdsl2', isDone: true, text: 'push to Github', isDeleted: false }),
        Map({ id: 'dg2gfkg4i', isDone: true, text: 'add Router', isDeleted: false }),
        Map({ id: 'm88fsqszq', isDone: true, text: 'type checking with Flow', isDeleted: false }),
        Map({ id: 'm34zkuir4', isDone: true, text: 'bindActionCreators (Redux)', isDeleted: false }),
        Map({ id: 'dfspx77ds', isDone: true, text: 'persist store on page refresh', isDeleted: false }),
        Map({ id: '1ds4faoef', isDone: true, text: 'test with Jest', isDeleted: false }),
        Map({ id: 'jkf9fdlr2', isDone: true, text: 'linting with ESLint', isDeleted: false }),
        Map({ id: 'jdf7lp11f', isDone: true, text: 'fix bug with rehydration weather state', isDeleted: false }),
        Map({ id: 'fdf3aef3f', isDone: false, text: 'log in page', isDeleted: false }),
        Map({ id: 'abs3ae2fq', isDone: false, text: 'messanger', isDeleted: false }),
        Map({ id: 'klhjh3rr2', isDone: false, text: 'nice notifications', isDeleted: false })
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
