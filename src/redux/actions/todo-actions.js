// @flow
import {Map} from 'immutable';
import type {Action} from '../types';
import uid from '../../helpers/id-generator';


export const addTodo  = (text: string): Action => {
    return {
        type: 'ADD_TODO',
        payload: Map({
            id: uid(),
            isDone: false,
            isDeleted: false,
            text
        })
    };
};

export const updateTodo = (id: string, text: string) => {
    return {
        type: 'UPDATE_TODO',
        payload: {id, text}
    }
}

export const toggleTodo = (id: string): Action => {
    return {
        type: 'TOGGLE_TODO',
        payload: id
    }
};

export const removeTodo = (id: string): Action => {
    return {
        type: 'REMOVE_TODO',
        payload: id
    }
}