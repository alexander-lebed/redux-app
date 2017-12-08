// @flow
import React from 'react';
import { combineReducers } from 'redux';
import $http from 'axios';
import _ from 'lodash';
import { Map } from 'immutable';
import type { Action, Dispatch, User } from '../../types';
import history from "../../helpers/history";
import { Alert } from './alerts';

const actions = {
    ADD_USER: 'ADD_USER',
    SET_USERS: 'SET_USERS'
};

// const initUsers: Map<string, User> = Map({
//     'alan@mail': {_id: 'lalala1', username: 'Alan', email: 'alan@mail', password: 'Alan'},
//     'lebed.alexander90@gmail.com': {_id: 'lalala2', username: 'gorodovoy', email: 'lebed.alexander90@gmail.com', password: 'WinterF3ll'}
// });
const initUsers: Map<string, User> = Map({});
const users = (state = initUsers, action: Action) => {
    switch (action.type) {
        case actions.ADD_USER: {
            return state.set(action.payload.email, action.payload);
        }
        case actions.SET_USERS: {
            return action.payload;
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

export function getUsers() {
    return (dispatch: Dispatch) => {
        $http.get('http://localhost:3001/api/users')
            .then(response => {
                const dataObj = _.keyBy(response.data, '_id');
                const payload = Map(dataObj);
                dispatch({
                    type: actions.SET_USERS, payload
                });
            })
            .catch(err => {
                const error = (
                    <div>
                        <strong>Error on fetch users:</strong>
                        <div>{err.message}</div>
                    </div>
                );
                dispatch(Alert.error(error));
            })
    }
}



