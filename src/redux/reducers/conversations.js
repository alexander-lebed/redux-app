// @flow
import React from 'react';
import { combineReducers } from 'redux';

import $http from 'axios';
import { orderBy, generateError } from '../../utils';
import { Alert } from './alerts';
import { showBrowserNotifications } from './startup';
import { CONVERSATIONS_URL, DOCUMENT_TITLE } from '../../constants';
import type { Action, Dispatch } from '../../types';

const actions = {
    ADD_CONVERSATION: 'ADD_CONVERSATION',
    SET_CONVERSATIONS: 'SET_CONVERSATIONS',
    SET_CONVERSATION: 'SET_CONVERSATION',
    CONVERSATION_LOADING: 'CONVERSATION_LOADING'
};

const conversations = (state = [], action: Action) => {
    switch (action.type) {
        case actions.ADD_CONVERSATION: {
            return state.concat(action.payload);
        }
        case actions.SET_CONVERSATIONS: {
            return [...action.payload];
        }
        default:
            return state;
    }
};

const conversation = (state = {}, action: Action) => {
    switch (action.type) {
        case actions.SET_CONVERSATION: {
            return {...action.payload};
        }
        default:
            return state;
    }
};

const isConversationsLoaded = (state = false, action: Action) => {
    switch (action.type) {
        case actions.SET_CONVERSATIONS: {
            return true;
        }
        default:
            return state;
    }
};

const isConversationLoaded = (state = false, action: Action) => {
    switch (action.type) {
        case actions.CONVERSATION_LOADING: {
            return false;
        }
        case actions.SET_CONVERSATION: {
            return true;
        }
        default:
            return state;
    }
};

export default combineReducers({
    conversations,
    conversation,
    isConversationsLoaded,
    isConversationLoaded
});


export function getConversationsByUser(userId: string) {
    return (dispatch: Dispatch) => {
        $http.get(`${CONVERSATIONS_URL}?userId=${userId}`)
            .then(response => {
                dispatch({
                    type: actions.SET_CONVERSATIONS,
                    payload: orderBy(response.data, 'timestamp', 'desc')
                });
            })
    }
}

export function getConversation(convId: string) {
    return (dispatch: Dispatch) => {
        dispatch({
            type: actions.CONVERSATION_LOADING
        });
        $http.get(`${CONVERSATIONS_URL}?convId=${convId}`)
            .then(response => {
                const conversation = response.data[0];
                dispatch({
                    type: actions.SET_CONVERSATION,
                    payload: conversation
                })
            })
    }
}

/**
 * Note:
 * If there is no conversation with specified users, it mocks a new one.
 */
export function getConversationWithUsers(userIds: Array<string>) {
    return (dispatch: Dispatch, getState: Function) => {

        dispatch({type: actions.CONVERSATION_LOADING});

        $http.get(`${CONVERSATIONS_URL}?userIds=${userIds.join(',')}`)
            .then(response => {
                let conversation = response.data[0];
                if (conversation) {
                    dispatch({
                        type: actions.SET_CONVERSATION,
                        payload: conversation
                    })
                } else {
                    // mock new conversation

                    const allUsers = getState().users.users;
                    const convUsers = allUsers.filter(u => userIds.includes(u._id)).map(u => ({_id: u._id, username: u.username}));
                    conversation = {
                        users: convUsers,
                        messages: [],
                        timestamp: null // to set the time on server side
                    };
                    dispatch({
                        type: actions.ADD_CONVERSATION,
                        payload: conversation
                    });
                    dispatch({
                        type: actions.SET_CONVERSATION,
                        payload: conversation
                    });
                }
            })
    }
}

export function markAsRead() {
    return (dispatch: Dispatch, getState: Function) => {
        const currentUser = getState().authentication.user;
        const conversation = getState().conversations.conversation;
        if (conversation.messages) {
            const hasUnread = conversation.messages.some(e => !e.read);
            if (hasUnread) {
                const convWithOneself = conversation.users.length === 1;
                conversation.messages.forEach(m => {
                    const notFromCurrentUser = m.from._id !== currentUser._id;
                    if (notFromCurrentUser || convWithOneself) {
                        m.read = true;
                    }
                });
                dispatch(saveConversation(conversation))
            }
        }
    }
}

export function saveConversation(conversation: Object) {
    return (dispatch: Dispatch) => {
        dispatch({
            type: actions.SET_CONVERSATION,
            payload: conversation
        });
        $http.put(CONVERSATIONS_URL, conversation);
    }
}

export function conversationCleanup() {
    return (dispatch: Dispatch) => {
        dispatch({
            type: actions.SET_CONVERSATION,
            payload: {}
        });
    }
}

export function deleteMessage(messageId: string) {
    return (dispatch: Dispatch, getState: Function) => {
        const conversation = getState().conversations.conversation;
        conversation.messages.forEach(m => {
            if (m._id === messageId) {
                m.deleted = true;
            }
        });
        dispatch(saveConversation(conversation))
    }
}

export function deleteConversation(convId: string) {
    return async (dispatch: Dispatch, getState: Function) => {
        const CONVERSATIONS = getState().translation.CONVERSATIONS;
        try {
            await $http.delete(`${CONVERSATIONS_URL}?convId=${convId}`);
            dispatch(Alert.success(CONVERSATIONS.DELETE_CONFIRMATION_SUCCESS));
        } catch (err) {
            const error = (
                <div>
                    <strong>{CONVERSATIONS.DELETE_CONFIRMATION_ERROR}</strong>
                    <div>{generateError(err)}</div>
                </div>
            );
            dispatch(Alert.error(error));
        }
    }
}

export function initConversationsWs(userId: string) {
    return (dispatch: Dispatch, getState: Function) => {

        const hash = `${userId}_${Date.now()}`;
        const webSocket = new WebSocket(`${process.env.WS_ADDRESS}/conversations?${hash}`);

        webSocket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.conversation) {
                    dispatch({
                        type: actions.SET_CONVERSATION,
                        payload: data.conversation
                    })
                }
                if (data.conversations) {
                    const sortedConversations = orderBy(data.conversations, 'timestamp', 'desc');
                    dispatch({
                        type: actions.SET_CONVERSATIONS,
                        payload: sortedConversations
                    });

                    // update browser tab title and show notification
                    const currentUser = getState().authentication.user;
                    const translation = getState().translation;
                    const newMessages = sortedConversations.filter(c => c.messages.some(m => !m.read && m.from._id !== currentUser._id));
                    if (newMessages.length > 0) {
                        document.title = translation.MESSAGES.NEW_MESSAGE(newMessages.length);
                        showBrowserNotifications(newMessages, dispatch, getState);
                    } else {
                        document.title = DOCUMENT_TITLE;
                    }
                }
            } catch (err) {
                console.log(`--- WS 'conversations' onmessage error: ${err}`);
            }
        };
    }
}