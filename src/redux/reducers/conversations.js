import React from 'react';
import { combineReducers } from 'redux';
import _ from 'lodash';
import $http from 'axios';
import { Alert } from "./alerts";
import generateError from '../../helpers/generateError';
import { CONVERSATIONS_URL } from "../../urls";
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
            // .catch(err => {
            //     const error = (
            //         <div>
            //             <strong>Error on fetch conversations:</strong>
            //             <div>{generateError(err)}</div>
            //         </div>
            //     );
            //     dispatch(Alert.error(error));
            // });
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
            // .catch(err => {
            //     const error = (
            //         <div>
            //             <strong>Error on fetch conversation:</strong>
            //             <div>{generateError(err)}</div>
            //         </div>
            //     );
            //     dispatch(Alert.error(error));
            // });
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
                        timestamp: Date.now()
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
            // .catch(err => {
            //     const error = (
            //         <div>
            //             <strong>Error on fetch conversation:</strong>
            //             <div>{generateError(err)}</div>
            //         </div>
            //     );
            //     dispatch(Alert.error(error));
            // });
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
            // .catch(err => {
            //     const error = (
            //         <div>
            //             <strong>Error on save conversation:</strong>
            //             <div>{generateError(err)}</div>
            //         </div>
            //     );
            //     dispatch(Alert.error(error));
            // });
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

export function conversationsCleanup() {
    return (dispatch: Dispatch) => {
        dispatch({
            type: actions.SET_CONVERSATIONS,
            payload: []
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

// todo: don't deleted, just mark as deleted
export function deleteConversation(convId: string) {
    return (dispatch: Dispatch, getState: Function) => {
        $http.delete(`${CONVERSATIONS_URL}?convId=${convId}`)
            .then(() => {
                dispatch(Alert.success('Conversation has been deleted.'));
                // update conversations state
                const currentUser = getState().authentication.user;
                if (currentUser) {
                    dispatch(getConversationsByUser(currentUser._id))
                }
            }).catch(err => {
                const error = (
                    <div>
                        <strong>Error on delete conversation:</strong>
                        <div>{generateError(err)}</div>
                    </div>
                );
                dispatch(Alert.error(error));
            })
    }
}

/*
const users = [
    {_id:"5a41105fb392155d94051100",password:"USER_1",email:"USER_1@mail",username:"USER_1"}   ,
    {_id:"5a44deee722dac719019e7be",password:"USER_2",email:"USER_2@mail",username:"USER_2"}   ,
    {_id:"5a29110972b7713a540696d1",password:"USER_3",email:"USER_3@mail",username:"USER_3"}
];

const initConvs = [
    {
        _id: 'c1',
        users: [
            {_id:"5a41105fb392155d94051100",username:"USER_1"},
            {_id:"5a44deee722dac719019e7be",username:"USER_2"}
        ],
        messages: [
            {
                from: {_id:"5a41105fb392155d94051100",username:"USER_1"},
                text: 'M1',
                timestamp: 1513068476000, // 12 Dec
                read: true,
                deleted: false
            },
            {
                from: {_id:"5a44deee722dac719019e7be",username:"USER_2"},
                text: 'M2',
                timestamp: 1513327676000, // 15 Dec
                read: false,
                deleted: false
            },
            {
                from: {_id:"5a44deee722dac719019e7be",username:"USER_2"},
                text: 'Sodfg dfgdfg!',
                timestamp: 1513327676000, // 15 Dec
                read: false,
                deleted: false
            }
        ],
        timestamp: 1513338697514 // 15 Dec
    },
    {
        _id: 'c2',
        users: [
            {_id:"5a41105fb392155d94051100",username:"USER_1"},
            {_id:"5a5e048fefa6b82958c08dfa",username:"USER_3"}
        ],
        messages: [
            {
                from: {_id:"5a41105fb392155d94051100",username:"USER_1"},
                text: 'M3',
                timestamp: 1513239956000, // 14 Dec
                read: false,
                deleted: false
            }
        ],
        timestamp: 1513245060000 // 14 Dec
    },
    {
        _id: 'c3',
        users: [
            {_id:"5a44deee722dac719019e7be",username:"USER_2"},
            {_id:"5a5e048fefa6b82958c08dfa",username:"USER_3"}
        ],
        messages: [
            {
                from: {_id:"5a44deee722dac719019e7be",username:"USER_2"},
                text: 'M4',
                timestamp: 1513330256000, // 15 Dec
                read: false,
                deleted: false
            },
            {
                from: {_id:"5a5e048fefa6b82958c08dfa",username:"USER_3"},
                text: 'M5',
                timestamp: 1513334456000, // 15 Dec
                read: false,
                deleted: false
            }
        ],
        timestamp: 1513334456000 // 15 Dec
    }
];
*/