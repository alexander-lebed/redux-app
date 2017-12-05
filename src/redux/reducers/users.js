// @flow
import {combineReducers} from 'redux';
import { Map } from 'immutable';
import type {Action, Dispatch, User} from '../../types';
import history from "../../helpers/history";
import { Alert } from './alerts';

const actions = {
    ADD_USER: 'ADD_USER'
};

const initUsers: Map<string, User> = Map({
    'alan@mail': {username: 'Alan', email: 'alan@mail', password: 'Alan'},
    'lebed.alexander90@gmail.com': {username: 'gorodovoy', email: 'lebed.alexander90@gmail.com', password: 'WinterF3ll'}
});
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
            dispatch(Alert.error(`User with ${email} email already exist`));
        }
    }
}



