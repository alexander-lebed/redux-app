// @flow
import { Map } from 'immutable';
import type { Action } from '../types';
import uid from '../../helpers/id-generator';


export const addTodo = (text: string): Action => ({
    type: 'ADD_TODO',
    payload: Map({
        id: uid(),
        isDone: false,
        isDeleted: false,
        text
    })
});

export const updateTodo = (id: string, text: string) => ({
    type: 'UPDATE_TODO',
    payload: { id, text }
});

export const toggleTodo = (id: string): Action => ({
    type: 'TOGGLE_TODO',
    payload: id
});

export const removeTodo = (id: string): Action => ({
    type: 'REMOVE_TODO',
    payload: id
});
