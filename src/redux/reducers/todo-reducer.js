// @flow
import { List, Map } from 'immutable';
import type { Action, State } from '../types';


const initialState = List([
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
    Map({ id: 'fdf3aef3f', isDone: false, text: 'fix bug with rehydration weather state', isDeleted: false }),
    Map({ id: 'fdf3aef3f', isDone: false, text: 'log in page', isDeleted: false }),
    Map({ id: '45frdbe2a', isDone: false, text: 'admin page with reset store', isDeleted: false })
]);

const reducer = (state: State = initialState, action: Action): State => {
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
};

export default reducer;
