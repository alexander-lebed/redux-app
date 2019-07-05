// @flow
import { combineReducers } from 'redux';
import $http from 'axios';
import hello from 'hellojs';
import { USERS_URL } from '../../constants';
import { toMongoID } from '../../utils';
import type { Action, Dispatch, User } from '../../types';
import { initConversationsWs } from './conversations';
import { initUsersWs } from './users';

const actions = {
    SET_USER: 'SET_USER'
};

const user = (state = null, action: Action) => {
    switch (action.type) {
        case actions.SET_USER: {
            return action.payload === null ? null : {...action.payload}
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

        if (user.oauth && user._id) {
            // check OAuth user on reload page
            const users = getState().users.users;
            loggedUser = users.filter(e => e.oauth).find(e => e._id === user._id && e.email === user.email);
        } else if (user.oauth) {
            // use OAuth service for login
            const oAuthService = hello.use(user.oauth);

            loggedUser = await oAuthService.login()
                .then(() => oAuthService.api('me'))
                .then(userData => {
                    const id = toMongoID(userData.id);
                    let username =  typeof userData.name === 'string' && userData.name;
                    if (!username) {
                        if (typeof userData.first_name === 'string' && userData.first_name.length > 0) {
                            username = userData.first_name;
                        } else if (userData.email) {
                            username = userData.email.substring(0, userData.email.indexOf('@'));
                        } else {
                            username = 'Username';
                        }
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
                // init WebSockets to listen back-end changes
                await dispatch(initUsersWs(loggedUser._id));
                await dispatch(initConversationsWs(loggedUser._id));

                // save user on back-end
                const response = await $http.put(`${USERS_URL}/${loggedUser._id}`, loggedUser);
                await dispatch(setUser(response.data));
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
                await hello.use(user.oauth).logout();
            }
            user.online = false;
            user.lastTime = null; // to set the time on server side
            return $http.put(`${USERS_URL}/${user._id}`, user).then(() => {
                dispatch(setUser(null));
            });
        } else {
            dispatch(setUser(null));
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

