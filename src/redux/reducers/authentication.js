// @flow
import {combineReducers} from 'redux';
import _ from 'lodash';
import $http from 'axios';
import { USERS_URL } from "../../constants";
import type { Action, Dispatch, User } from '../../types';
import { getUsers } from "./users";

const actions = {
    SET_USER: 'SET_USER'
};

const user = (state =  null, action: Action) => {
    switch (action.type) {
        case actions.SET_USER: {
            return _.clone(action.payload);
        }
        default:
            return state;
    }
};

export default combineReducers({
    user
});


export function login(email: string, password: string) {
    return async (dispatch: Dispatch, getState: Function) => {
        const users = getState().users.users;
        const user = users.find(e => e.email === email && e.password === password);
        if (user) {
            user.online = true;
            try {
                const response = await $http.put(`${USERS_URL}/${user._id}`, user);
                dispatch(setUser(response.data));
                return true;
            } catch (err) {
                dispatch(setUser(null));
                return false;
            }
        } else {
            dispatch(setUser(null));
            return false;
        }
    }
}

export function logout() {
    return (dispatch: Dispatch, getState: Function) => {

        const user = getState().authentication.user;
        if (user) {
            user.online = false;
            user.lastTime = null; // to set the time on server side
            return $http.put(`${USERS_URL}/${user._id}`, user).then(() => {
                dispatch(setUser(null));
            });
        }
    }
}

export function online(isOnline: boolean) {
    return async (dispatch: Dispatch, getState: Function) => {
        const user = getState().authentication.user;
        if (user) {
            user.online = isOnline;
            user.lastTime = null; // to set the time on server side
            const response = await $http.put(`${USERS_URL}/${user._id}`, user);
            dispatch(setUser(response.data));
            dispatch(getUsers());
        }
    }
}

export function setUser(user: User | null) {
    return (dispatch: Dispatch) => {
        dispatch({
            type: actions.SET_USER,
            payload: user
        });
    }
}

