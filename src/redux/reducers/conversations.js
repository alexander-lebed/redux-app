import { combineReducers } from 'redux';
import _ from 'lodash';
import type { Action, Dispatch } from '../../types';

const actions = {
    ADD_CONVERSATION: 'ADD_CONVERSATION',
    SET_CONVERSATIONS: 'SET_CONVERSATION',
    ADD_MESSAGE: 'ADD_MESSAGE',
    SET_MESSAGES: 'SET_MESSAGES'
};

/*
const users = [
    {_id:"5a29085f902c142d442f7ebc",password:"USER_1",email:"USER_1@mail",username:"USER_1"}   ,
    {_id:"5a2909301d4700398859e72f",password:"USER_2",email:"USER_2@mail",username:"USER_2"}   ,
    {_id:"5a29110972b7713a540696d1",password:"USER_3",email:"USER_3@mail",username:"USER_3"}
];
*/

const initConvs = [
    {
        _id: 'c1',
        name: 'C1',
        users: [
            {_id:"5a29085f902c142d442f7ebc",password:"USER_1",email:"USER_1@mail",username:"USER_1"},
            {_id:"5a2909301d4700398859e72f",password:"USER_2",email:"USER_2@mail",username:"USER_2"}
        ],
        messages: [
            {
                _id: 'm1',
                from: {_id:"5a29085f902c142d442f7ebc",password:"USER_1",email:"USER_1@mail",username:"USER_1"},
                text: 'M1',
                timestamp: 1513068476000, // 12 Dec
                read: true,
                deleted: false
            },
            {
                _id: 'm2',
                from: {_id:"5a2909301d4700398859e72f",password:"USER_2",email:"USER_2@mail",username:"USER_2"},
                text: 'M2',
                timestamp: 1513327676000, // 15 Dec
                read: false,
                deleted: false
            }
        ],
        timestamp: 1513338697514, // 15 Dec
        read: false,
        deleted: false
    },
    {
        _id: 'c2',
        name: 'C2',
        users: [
            {_id:"5a29085f902c142d442f7ebc",password:"USER_1",email:"USER_1@mail",username:"USER_1"},
            {_id:"5a29110972b7713a540696d1",password:"USER_3",email:"USER_3@mail",username:"USER_3"}
        ],
        messages: [
            {
                _id: 'm3',
                from: {_id:"5a29085f902c142d442f7ebc",password:"USER_1",email:"USER_1@mail",username:"USER_1"},
                text: 'M3',
                timestamp: 1513239956000, // 14 Dec
                read: true,
                deleted: false
            }
        ],
        timestamp: 1513245060000, // 14 Dec
        read: false,
        deleted: false
    },
    {
        _id: 'c3',
        name: 'C3',
        users: [
            {_id:"5a2909301d4700398859e72f",password:"USER_2",email:"USER_2@mail",username:"USER_2"},
            {_id:"5a29110972b7713a540696d1",password:"USER_3",email:"USER_3@mail",username:"USER_3"}
        ],
        messages: [
            {
                _id: 'm4',
                from: {_id:"5a2909301d4700398859e72f",password:"USER_2",email:"USER_2@mail",username:"USER_2"},
                text: 'M4',
                timestamp: 1513330256000, // 15 Dec
                read: false,
                deleted: false
            },
            {
                _id: 'm5',
                from: {_id:"5a29110972b7713a540696d1",password:"USER_3",email:"USER_3@mail",username:"USER_3"},
                text: 'M5',
                timestamp: 1513334456000, // 15 Dec
                read: false,
                deleted: false
            }
        ],
        timestamp: 1513064100000, // 12 Dec
        read: false,
        deleted: false
    }
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

const messages = (state = [], action: Action) => {
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
        // todo: service call
        const conversations = getState().conversations.conversations;
        const userConversations = conversations.filter(c => c.users.map(u => u._id).includes(userId));
        dispatch({
            type: actions.SET_CONVERSATIONS,
            payload: _.orderBy(userConversations, 'timestamp', 'desc')
        })
    }
}

export function getMessagesByConversation(convId: string) {
    return (dispatch: Dispatch, getState: Function) => {
        // todo: service call
        const conversation = getState().conversations.conversations.filter(e => e._id === convId);
        const messages = conversation.length > 0 ? conversation[0].messages : [];
        dispatch({
            type: actions.SET_MESSAGES,
            payload: _.orderBy(messages, 'timestamp', 'desc')
        })
    }
}