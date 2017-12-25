import { combineReducers } from 'redux';
import _ from 'lodash';
import uid from '../../helpers/id-generator';
import type { Action, Dispatch } from '../../types';

const actions = {
    ADD_CONVERSATION: 'ADD_CONVERSATION',
    SET_CONVERSATIONS: 'SET_CONVERSATIONS',
    SET_CONVERSATION: 'SET_CONVERSATION'
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
            {_id:"5a29085f902c142d442f7ebc",username:"USER_1"},
            {_id:"5a2909301d4700398859e72f",username:"USER_2"}
        ],
        messages: [
            {
                from: {_id:"5a29085f902c142d442f7ebc",username:"USER_1"},
                text: 'M1',
                timestamp: 1513068476000, // 12 Dec
                read: true,
                deleted: false
            },
            {
                from: {_id:"5a2909301d4700398859e72f",username:"USER_2"},
                text: 'M2',
                timestamp: 1513327676000, // 15 Dec
                read: false,
                deleted: false
            },
            {
                from: {_id:"5a2909301d4700398859e72f",username:"USER_2"},
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
        name: 'C2',
        users: [
            {_id:"5a29085f902c142d442f7ebc",username:"USER_1"},
            {_id:"5a29110972b7713a540696d1",username:"USER_3"}
        ],
        messages: [
            {
                from: {_id:"5a29085f902c142d442f7ebc",username:"USER_1"},
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
        name: 'C3',
        users: [
            {_id:"5a2909301d4700398859e72f",username:"USER_2"},
            {_id:"5a29110972b7713a540696d1",username:"USER_3"}
        ],
        messages: [
            {
                from: {_id:"5a2909301d4700398859e72f",username:"USER_2"},
                text: 'M4',
                timestamp: 1513330256000, // 15 Dec
                read: false,
                deleted: false
            },
            {
                from: {_id:"5a29110972b7713a540696d1",username:"USER_3"},
                text: 'M5',
                timestamp: 1513334456000, // 15 Dec
                read: false,
                deleted: false
            }
        ],
        timestamp: 1513334456000 // 15 Dec
    }
];

const conversations = (state = initConvs, action: Action) => {
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
    return (dispatch: Dispatch, getState: Function) => {
        // todo: service call: GET
        const conversations = getState().conversations.conversations;
        const userConversations = conversations.filter(c => c.users.map(u => u._id).includes(userId));
        dispatch({
            type: actions.SET_CONVERSATIONS,
            payload: _.orderBy(userConversations, 'timestamp', 'desc')
        })
    }
}

export function getConversation(convId: string) {
    return (dispatch: Dispatch, getState: Function) => {
        // todo: service call
        const conversation = getState().conversations.conversations.find(e => e._id === convId);
        dispatch({
            type: actions.SET_CONVERSATION,
            payload: conversation
        })
    }
}

/**
 * Note:
 * If there is no conversation with specified users, it creates a new one.
 */
export function getConversationWithUsers(userIds: Array<string>) {
    return (dispatch: Dispatch, getState: Function) => {
        // todo: service call: GET
        const findWithUser = (conversation: Object) => {
            const matchQuantity = conversation.users.length === userIds.length;
            const convUsers = conversation.users.map(u => u._id).sort();
            const matchIds = _.isEqual(convUsers, userIds.sort());
            return matchQuantity && matchIds;
        };

        let conversation = getState().conversations.conversations.find(findWithUser);
        if (!conversation) {
            // create new

            const allUsers = getState().users.users;
            const convUsers = allUsers.toArray().filter(u => userIds.includes(u._id)).map(u => ({_id: u._id, username: u.username}));
            const id = uid();
            conversation = {
                _id: id,
                name: id.substring(Math.round(id.length / 2)).toUpperCase(),
                users: convUsers,
                messages: [],
                timestamp: Date.now(),
                read: false,
                deleted: false
            };
            // todo: service call: POST new conversation
            dispatch({
                type: actions.ADD_CONVERSATION,
                payload: conversation
            });
        }

        dispatch({
            type: actions.SET_CONVERSATION,
            payload: conversation || {}
        })
    }
}

export function markAsRead() {
    return (dispatch: Dispatch, getState: Function) => {
        const currentUser = getState().authentication.user;
        const conversation = getState().conversations.conversation;
        conversation.messages.forEach(m => {
            if (m.from._id !== currentUser._id) {
                m.read = true;
            }
        });
        dispatch(saveConversation(conversation))
    }
}

export function saveConversation(conversation: Object) {
    return (dispatch: Dispatch, getState: Function) => {
        const conversations = getState().conversations.conversations;
        // todo: service call: PUT existing conversation
        dispatch({
            type: actions.SET_CONVERSATION,
            payload: conversation
        });
        conversations.forEach(c => {
            if (c._id === conversation._id) {
                c = conversation;
            }
        });
        // todo: service call: PUT replace only USER's conversations!
        dispatch({
            type: actions.SET_CONVERSATIONS,
            payload: conversations
        })
    }
}