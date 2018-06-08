// @flow
import React from 'react';
import { combineReducers } from 'redux';
import _ from 'lodash';
import $http from 'axios';
import { Alert } from "./alerts";
import generateError from '../../helpers/generateError';
import { CONVERSATIONS_URL } from "../../constants";
import type { Action, Dispatch } from '../../types';

const actions = {
    ADD_CONVERSATION: 'ADD_CONVERSATION',
    SET_CONVERSATIONS: 'SET_CONVERSATIONS',
    SET_CONVERSATION: 'SET_CONVERSATION'
};

const conversations = (state = [], action: Action) => {
    switch (action.type) {
        case actions.ADD_CONVERSATION: {
            return state.concat(action.payload);
        }
        case actions.SET_CONVERSATIONS: {
            return _.clone(action.payload);
        }
        default:
            return state;
    }
};

const conversation = (state = {}, action: Action) => {
    switch (action.type) {
        case actions.SET_CONVERSATION: {
            return _.clone(action.payload);
        }
        default:
            return state;
    }
};

export default combineReducers({
    conversations,
    conversation
});


export function getConversationsByUser(userId: string) {
    return (dispatch: Dispatch) => {
        $http.get(`${CONVERSATIONS_URL}?userId=${userId}`)
            .then(response => {
                dispatch({
                    type: actions.SET_CONVERSATIONS,
                    payload: _.orderBy(response.data, 'timestamp', 'desc')
                });
            })
    }
}

export function getConversation(convId: string) {
    return (dispatch: Dispatch) => {
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
 * If there is no conversation with specified users, it creates a new one.
 */
export function getConversationWithUsers(userIds: Array<string>) {
    return (dispatch: Dispatch, getState: Function) => {

        $http.get(`${CONVERSATIONS_URL}?userIds=${userIds.join(',')}`)
            .then(response => {
                let conversation = response.data[0];

                if (conversation) {
                    dispatch({
                        type: actions.SET_CONVERSATION,
                        payload: conversation || {}
                    })
                } else {
                    // create new

                    const allUsers = getState().users.users;
                    const convUsers = allUsers.toArray().filter(u => userIds.includes(u._id)).map(u => ({_id: u._id, username: u.username}));
                    conversation = {
                        users: convUsers,
                        messages: [],
                        timestamp: null // to set the time on server side
                    };

                    $http.put(CONVERSATIONS_URL, conversation)
                        .then(response => {
                            dispatch({
                                type: actions.ADD_CONVERSATION,
                                payload: response.data
                            });
                            dispatch({
                                type: actions.SET_CONVERSATION,
                                payload: response.data
                            })
                        })
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
    return (dispatch: Dispatch, getState: Function) => {

        $http.put(CONVERSATIONS_URL, conversation)
            .then(response => {
                dispatch({
                    type: actions.SET_CONVERSATION,
                    payload: response.data
                });
                // update conversations state
                const currentUser = getState().authentication.user;
                if (currentUser) {
                    dispatch(getConversationsByUser(currentUser._id))
                }
            })
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

// this method doesn't delete conversation, just mark as deleted
export function deleteConversation(convId: string) {
    return async (dispatch: Dispatch, getState: Function) => {
        try {
            await $http.delete(`${CONVERSATIONS_URL}?convId=${convId}`);
            dispatch(Alert.success('Conversation has been deleted.'));
            // update conversations state
            const currentUser = getState().authentication.user;
            if (currentUser) {
                dispatch(getConversationsByUser(currentUser._id))
            }
        } catch (err) {
            const error = (
                <div>
                    <strong>Error on delete conversation:</strong>
                    <div>{generateError(err)}</div>
                </div>
            );
            dispatch(Alert.error(error));
        }
    }
}