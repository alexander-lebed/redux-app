import { combineReducers } from 'redux';
import type { Action, Dispatch } from '../../types';
import { getUsers } from './users';
import { login } from './authentication';
import { getConversationsByUser } from './conversations';
import { Alert } from './alerts';
import { DOCUMENT_TITLE } from "../../constants";

const actions = {
    START_INIT: 'START_INIT',
    END_INIT: 'END_INIT'
};

const loading = (state = false, action: Action) => {
    switch (action.type) {
        case actions.START_INIT:
            return true;
        case actions.END_INIT:
            return false;
        default:
            return state;
    }
};

export default combineReducers({
    loading
});


export function initApp() {
    return (dispatch: Dispatch, getState: Function) => {
        dispatch({
            type: actions.START_INIT
        });
        Promise.resolve()
            .then(() => dispatch(getUsers()))
            .then(() => {
                const currentUser = getState().authentication.user;
                if (currentUser) {
                    return dispatch(login(currentUser.email, currentUser.password)).then(isLoggedIn => {
                        if (!isLoggedIn) {
                            dispatch(Alert.error('Please re-login'));
                        }
                    })
                }
            })
            .then(() => {
                dispatch({
                    type: actions.END_INIT
                });
            });
    }
}

export function updateData() {
    return (dispatch: Dispatch, getState: Function) => {
        // refresh users
        dispatch(getUsers());
        // refresh user messages
        const currentUser = getState().authentication.user;
        if (currentUser) {
            Promise.resolve()
                .then(() => dispatch(getConversationsByUser(currentUser._id)))
                .then(() => {
                    // update document title
                    const conversations = getState().conversations.conversations;
                    const newMessages = conversations.filter(c => c.messages.some(m => !m.read && m.from._id !== currentUser._id));
                    if (newMessages.length > 0) {
                        document.title = `${newMessages.length} new message${newMessages.length > 1 ? 's' : ''}`;
                    } else {
                        document.title = DOCUMENT_TITLE;
                    }
                })
        }
    }
}