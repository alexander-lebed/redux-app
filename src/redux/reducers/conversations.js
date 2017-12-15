import React from 'react';
import { combineReducers } from 'redux';
import type { Action, Dispatch } from '../../types';

const actions = {
    ADD_CONVERSATION: 'ADD_CONVERSATION',
    SET_CONVERSATIONS: 'SET_CONVERSATION',
    ADD_MESSAGE: 'ADD_MESSAGE',
    SET_MESSAGES: 'SET_MESSAGES'
};

const initConvs = [
    {_id: 'c1', users: ['5a29085f902c142d442f7ebc', '5a2909301d4700398859e72f'], name: 'C1', time: 1513338697514, read: false, deleted: false}, // [1, 2], 15 Dec
    {_id: 'c2', users: ['5a29085f902c142d442f7ebc', '5a29110972b7713a540696d1'], name: 'C2', time: 1513245060000, read: false, deleted: false}, // [1, 3], 14 Dec
    {_id: 'c3', users: ['5a2909301d4700398859e72f', '5a29110972b7713a540696d1'], name: 'C3', time: 1513064100000, read: false, deleted: false}  // [2, 3], 12 Dec
];

const initMessages = [
    {_id: 'm1', convId: 'c1', text: 'M1', time: 1513068476000, read: true, deleted: false}, // 12 Dec
    {_id: 'm2', convId: 'c1', text: 'M2', time: 1513327676000, read: false, deleted: false}, // 15 Dec
    {_id: 'm3', convId: 'c2', text: 'M3', time: 1513239956000, read: true, deleted: false}, // 14 Dec
    {_id: 'm4', convId: 'c3', text: 'M4', time: 1513330256000, read: false, deleted: false}, // 15 Dec
    {_id: 'm5', convId: 'c3', text: 'M5', time: 1513334456000, read: false, deleted: false} // 15 Dec
];

const conversations = (state = initConvs, action: Action) => {
    switch (action.type) {
        case actions.ADD_CONVERSATION: {
            return state.concat(action.payload);
        }
        case actions.SET_CONVERSATIONS: {
            return action.payload;
        }
        default:
            return state;
    }
};

const messages = (state = initMessages, action: Action) => {
    switch (action.type) {
        case actions.ADD_MESSAGE: {
            return state.concat(action.payload);
        }
        case actions.SET_MESSAGES: {
            return action.payload;
        }
        default:
            return state;
    }
};

export default combineReducers({
    conversations,
    messages
});


export function getConversationsByUser(userId: string) {
    return (dispatch: Dispatch, getState: Function) => {
        const conversations = getState().conversations.conversations;
        dispatch({
            type: actions.SET_CONVERSATIONS,
            payload: conversations.filter(c => c.users.includes(userId))
        })
    }
}

export function getMessagesByConversation(convId: string) {
    return (dispatch: Dispatch, getState: Function) => {
        const messages = getState().conversations.messages;
        dispatch({
            type: actions.SET_MESSAGES,
            payload: messages.filter(c => c.convId === convId)
        })
    }
}