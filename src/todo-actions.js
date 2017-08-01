import {Map} from 'immutable';
import uid from './helpers/id-generator';

export const addTodo  = text => {
    return {
        type: 'ADD_TODO',
        payload: Map({
            id: uid(),
            isDone: false,
            text
        })
    };
};

export const toggleTodo = id => {
    return {
        type: 'TOGGLE_TODO',
        payload: id
    }
};

export const removeTodo = id => {
    return {
        type: 'REMOVE_TODO',
        payload: id
    }
}