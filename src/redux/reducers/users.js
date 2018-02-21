// @flow
import React from 'react';
import { combineReducers } from 'redux';
import $http from 'axios';
import _ from 'lodash';
import { Map } from 'immutable';
import history from "../../helpers/history";
import { USERS_URL} from '../../constants';
import generateError from "../../helpers/generateError";
import { Alert } from './alerts';
import { login, setUser } from './authentication';
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
                password,
                online: false,
                lastTime: Date.now()
            };
            $http.post(USERS_URL, payload)
                .then(response => {
                    const user = response.data;
                    Promise.resolve()
                        .then(() => dispatch({type: actions.ADD_USER, payload: user}))
                        .then(() => {
                            // $FlowFixMe
                            dispatch(login(user.email, user.password)).then(isLoggedIn => {
                                if (isLoggedIn) {
                                    history.push('/');
                                }
                            })
                        })
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
    }
}

export function editUser(userId: string, user: User) {
    return (dispatch: Dispatch, getState: Function) => {

        const currentUser = getState().authentication.user;

        if (currentUser._id === userId) {
            $http.put(`${USERS_URL}/${userId}`, user)
                .then((response) => dispatch(setUser(response.data)))
                .then(() => dispatch(Alert.success('Your profile has been updated.')))
                .then(() => dispatch(getUsers()))
                .catch(err => {
                    const error = (
                        <div>
                            <strong>Error on update profile:</strong>
                            <div>{generateError(err)}</div>
                        </div>
                    );
                    dispatch(Alert.error(error));
                })
        }
    }
}

export function deleteUser(userId: string) {
    return (dispatch: Dispatch) => {
        $http.delete(`${USERS_URL}?userId=${userId}`)
            .then(() => {
                dispatch(Alert.success('User has been deleted.'));
                dispatch(getUsers())
            }).catch(err => {
                const error = (
                    <div>
                        <strong>Error on delete user:</strong>
                        <div>{generateError(err)}</div>
                    </div>
                );
                dispatch(Alert.error(error));
            })
    }
}



