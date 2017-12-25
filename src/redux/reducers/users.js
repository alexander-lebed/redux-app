// @flow
import React from 'react';
import { combineReducers } from 'redux';
import $http from 'axios';
import _ from 'lodash';
import { Map } from 'immutable';
import history from "../../helpers/history";
import { USERS_URL } from '../../urls';
import { Alert } from './alerts';
import type { Action, Dispatch, User } from '../../types';

const actions = {
    ADD_USER: 'ADD_USER',
    SET_USERS: 'SET_USERS'
};

const initUsers: Map<string, User> = Map({});
const users = (state = initUsers, action: Action) => {
    switch (action.type) {
        case actions.ADD_USER: {
            return state.set(action.payload.email, action.payload);
        }
        case actions.SET_USERS: {
            return _.clone(action.payload);
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
        const registeredUser = users.get(email);

        if (!registeredUser) {
            const payload = {
                username,
                email,
                password
            };
            return $http.post(USERS_URL, payload)
                .then(response => {
                    dispatch({
                        type: actions.ADD_USER,
                        payload: response.data
                    });
                    history.push('/');
                })
                .catch(e => {
                    dispatch(Alert.error(`Error on register user: ${e.toString()}`));
                })
        } else {
            dispatch(Alert.error(`User with ${email} email already exist`));
        }
    }
}

export function getUsers() {
    return (dispatch: Dispatch) => {
        $http.get(USERS_URL)
            .then(response => {
                const dataObj = _.keyBy(response.data, 'email');
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



