// @flow
import React from 'react';
import { combineReducers } from 'redux';
import $http from 'axios';
import { orderBy, encryptPassword, generateError } from '../../utils';
import history from "../../helpers/history";
import { USERS_URL} from '../../constants';
import { Alert } from './alerts';
import { login, setUser } from './authentication';
import type { Action, Dispatch, User } from '../../types';

const actions = {
    ADD_USER: 'ADD_USER',
    SET_USERS: 'SET_USERS'
};

const initUsers: Array<User> = [];
const users = (state = initUsers, action: Action) => {
    switch (action.type) {
        case actions.ADD_USER: {
            const users = [...state];
            users.push(action.payload);
            return users;
        }
        case actions.SET_USERS: {
            return [...action.payload];
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
        const translation = getState().translation;
        const registeredUser = users.filter(e => !e.oauth).find(e => e.email === email);
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
                const isLoggedIn = await dispatch(login(user));
                if (isLoggedIn) {
                    history.push('/');
                }
            } catch (err) {
                dispatch(Alert.error(translation.AUTH.SIGN_UP_ERROR(err.toString())));
            }
        } else {
            dispatch(Alert.error(translation.AUTH.USER_WITH_EMAIL_ALREADY_EXIST(email)));
        }
    }
}

export function getUsers() {
    return (dispatch: Dispatch) => {
        $http.get(USERS_URL)
            .then(response => {
                const payload = orderBy(response.data, ['username']);
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
                dispatch(Alert.success(getState().translation.ACCOUNT.PROFILE_UPDATED));
            } catch (err) {
                const error = (
                    <div>
                        <strong>{getState().translation.ACCOUNT.EDIT_PROFILE_ERROR}</strong>
                        <div>{generateError(err)}</div>
                    </div>
                );
                dispatch(Alert.error(error));
            }
        }
    }
}

export function deleteUser(userId: string) {
    return async (dispatch: Dispatch, getState: Function) => {
        try {
            await $http.delete(`${USERS_URL}?userId=${userId}`);
            dispatch(Alert.success(getState().translation.PEOPLE.USER_DELETED));
        } catch (err) {
            const error = (
                <div>
                    <strong>{getState().translation.PEOPLE.USER_DELETE_ERROR}</strong>
                    <div>{generateError(err)}</div>
                </div>
            );
            dispatch(Alert.error(error));
        }
    }
}

export function initUsersWs(userId: string) {
    return (dispatch: Dispatch) => {

        const hash = `${userId}_${Date.now()}`;
        const webSocket = new WebSocket(`${process.env.WS_ADDRESS}/users?${hash}`);

        webSocket.onmessage = (event) => {
            try {
                const users = JSON.parse(event.data);
                const payload = orderBy(users, 'username');
                dispatch({
                    type: actions.SET_USERS, payload
                });
            } catch (err) {
                console.log(`--- WS 'users' onmessage error: ${err}`);
            }
        };
    }
}


