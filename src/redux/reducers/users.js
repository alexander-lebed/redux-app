// @flow
import {combineReducers} from 'redux';
import { List } from 'immutable';
import type { Action, User } from '../types';

const actions = {
    ADD_USER: 'ADD_USER'
};


const initUsers: List<User> = List([{username: 'Alan', password: 'Alan'}]);

const users = (state = initUsers, action: Action) => {
    switch (action.type) {
        case actions.ADD_USER: {
            // do logic
            return state;
        }
        default:
            return state;
    }
};

export default combineReducers({
    users
});




