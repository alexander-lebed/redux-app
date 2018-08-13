// @flow
import {combineReducers} from 'redux';
import _ from 'lodash';
import $http from 'axios';
import hello from 'hellojs';
import { USERS_URL } from "../../constants";
import toMongoID from '../../helpers/toMongoID';
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


export function login(user: User) {
    return async (dispatch: Dispatch, getState: Function) => {

        let loggedUser: User;
        if (user.oauth) {
            const oAuthService = hello.use(user.oauth);

            loggedUser = await oAuthService.login()
                .then(() => oAuthService.api('me'))
                .then(userData => {
                    const id = toMongoID(userData.id);
                    let username = _.isString(userData.name) && userData.name;
                    if (!username) {
                        username = _.isString(userData.first_name) && userData.first_name.length > 0 ? userData.first_name : 'Username'
                    }
                    return {
                        _id: id,
                        username: username,
                        email: userData.email || '',
                        password: '',
                        online: true,
                        pictureUrl: userData.thumbnail,
                        lastTime: null,
                        oauth: user.oauth
                    }
                })
                .catch((err) => {
                    console.log(`--- OAuth login error: ${err.error.message}`);
                    return null;
                })
        } else {
            const users = getState().users.users;
            loggedUser = users.filter(e => !e.oauth).find(e => e.email === user.email && e.password === user.password);
        }

        if (loggedUser) {
            loggedUser.online = true;
            try {
                const response = await $http.put(`${USERS_URL}/${loggedUser._id}`, loggedUser);
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
    return async (dispatch: Dispatch, getState: Function) => {

        const user = getState().authentication.user;
        if (user) {
            if (user.oauth) {
                await hello(user.oauth).logout();
            }
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

