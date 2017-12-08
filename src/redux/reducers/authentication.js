// @flow
import {combineReducers} from 'redux';
// import history from  '../../helpers/history';
// import { Alert } from './alerts';
import type { Action, Dispatch } from '../../types';

const actions = {
    SET_USER: 'SET_USER'
};

const user = (state =  null, action: Action) => {
    switch (action.type) {
        case actions.SET_USER: {
            return action.payload;
        }
        default:
            return state;
    }
};

export default combineReducers({
    user
});


export function login(email: string, password: string) {
    return (dispatch: Dispatch, getState: Function) => {
        return new Promise(function(resolve) {
            const users = getState().users.users;
            const user = users.find(e => e.email === email && e.password === password);
            if (user) {
                dispatch({
                    type: actions.SET_USER,
                    payload: user
                });
                resolve(true);
            } else {
                dispatch({
                    type: actions.SET_USER,
                    payload: null
                });
                resolve(false);
            }
        })
    }
}

export function logout() {
    return (dispatch: Dispatch) => {
        dispatch({
            type: actions.SET_USER,
            payload: null
        });
    }
}



