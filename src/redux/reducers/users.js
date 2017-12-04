// @flow
import {combineReducers} from 'redux';
import { Map } from 'immutable';
import type {Action, Dispatch, User} from '../types';
import history from "../../helpers/history";

const actions = {
    ADD_USER: 'ADD_USER'
};


const initUsers: Map<string, User> = Map(
    {'alan@mail': {username: 'Alan', email: 'alan@mail', password: 'Alan'}}
);

const users = (state = initUsers, action: Action) => {
    switch (action.type) {
        case actions.ADD_USER: {
            return state.set(action.payload.email, action.payload);
        }
        default:
            return state;
    }
};

export default combineReducers({
    users
});

export function register(username: string, email: string, password: string) {
    return (dispatch: Dispatch, getState: Function) => {
        const users = getState().users.users;
        const user = users.get(email);
        if (!user) {
            dispatch({
                type: actions.ADD_USER,
                payload: {
                    username,
                    email,
                    password
                }
            });
            history.push('/');
        } else {
            alert(`User with ${email} email already exist`);
        }
    }
}



