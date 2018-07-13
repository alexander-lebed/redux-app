// @flow
import React from 'react';
import { combineReducers } from 'redux';
import $http from 'axios';
import _ from 'lodash';
import { Map } from 'immutable';
import history from "../../helpers/history";
import { USERS_URL} from '../../constants';
import encryptPassword from '../../helpers/encryptPassword';
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
    return async (dispatch: Dispatch, getState: Function) => {

        const users = getState().users.users;
        const registeredUser = users.get(email);
        const encryptedPassword = encryptPassword(password);

        if (!registeredUser) {
            const payload = {
                username,
                email,
                password: encryptedPassword,
                online: true,
                lastTime: null // flag to set the time on server side
            };
            try {
                const response = await $http.post(USERS_URL, payload);
                const user = response.data;
                await dispatch({
                    type: actions.ADD_USER,
                    payload: user
                });
                const isLoggedIn = await dispatch(login(user.email, user.password));
                if (isLoggedIn) {
                    history.push('/');
                }
            } catch (err) {
                dispatch(Alert.error(`Error on register user: ${err.toString()}`));
            }
        } else {
            dispatch(Alert.error(`User with ${email} email already exist`));
        }
    }
}

export function getUsers() {
    return (dispatch: Dispatch) => {
        $http.get(USERS_URL)
            .then(response => {
                const sorted = _.orderBy(response.data, ['username']);
                const dataObj = _.keyBy(sorted, 'email');
                const payload = Map(dataObj);
                dispatch({
                    type: actions.SET_USERS, payload
                });
            })
    }
}

export function editUser(userId: string, user: User) {
    return async (dispatch: Dispatch, getState: Function) => {

        const currentUser = getState().authentication.user;

        if (currentUser._id === userId) {
            try {
                const response = await $http.put(`${USERS_URL}/${userId}`, user);
                await dispatch(setUser(response.data));
                dispatch(Alert.success('Your profile has been updated.'));
                dispatch(getUsers());
            } catch (err) {
                const error = (
                    <div>
                        <strong>Error on update profile:</strong>
                        <div>{generateError(err)}</div>
                    </div>
                );
                dispatch(Alert.error(error));
            }
        }
    }
}

export function deleteUser(userId: string) {
    return async (dispatch: Dispatch) => {
        try {
            await $http.delete(`${USERS_URL}?userId=${userId}`);
            dispatch(Alert.success('User has been deleted.'));
            dispatch(getUsers());
        } catch (err) {
            const error = (
                <div>
                    <strong>Error on delete user:</strong>
                    <div>{generateError(err)}</div>
                </div>
            );
            dispatch(Alert.error(error));
        }
    }
}



