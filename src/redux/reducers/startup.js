import { combineReducers } from 'redux';
import { getUsers } from './users';
import { login, online } from './authentication';
import { getConversationsByUser } from './conversations';
import { Alert } from './alerts';
import { DOCUMENT_TITLE } from "../../constants";

const actions = {
    START_INIT: 'START_INIT',
    END_INIT: 'END_INIT',
    WINDOW_ACTIVE: 'UPDATE_USER_ACTIVE',
    BLOCKED_MESSAGES: 'BLOCKED_MESSAGES'
};

const loading = (state = false, action) => {
    switch (action.type) {
        case actions.START_INIT:
            return true;
        case actions.END_INIT:
            return false;
        default:
            return state;
    }
};

const isUserInMessenger = (state = true, action) => {
    switch (action.type) {
        case actions.WINDOW_ACTIVE:
            return action.payload;
        default:
            return state;
    }
};

const blockedNotifications = (state = [], action) => {
    switch (action.type) {
        case actions.BLOCKED_MESSAGES:
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    loading,
    isUserInMessenger,
    blockedNotifications
});


export function initApp() {
    return (dispatch, getState) => {
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
            .then(() => dispatch({type: actions.BLOCKED_MESSAGES, payload: []}))
            .then(() => {
                window.addEventListener('focus', () => dispatch({type: actions.WINDOW_ACTIVE, payload: true}));
                window.addEventListener('blur', () => dispatch({type: actions.WINDOW_ACTIVE, payload: false}));

                // ask user to show or block browser notifications
                if (Notification && Notification.permission !== 'granted') {
                    Notification.requestPermission();
                }

                const currentUser = getState().authentication.user;
                const confirmLeave = (event) => {
                    event.preventDefault();
                    if (currentUser && currentUser.online) {
                        dispatch(online(false)); // go user offline on page leave
                        setTimeout(() => dispatch(online(true)), 1000); // back to online if user click Cancel
                        return event.returnValue = 'Are you sure you what to leave?';
                    }
                    return null;
                };
                window.addEventListener('beforeunload', (event) => confirmLeave(event));
                window.addEventListener('unload', (event) => confirmLeave(event));

                dispatch({
                    type: actions.END_INIT
                });
            });
    }
}

export function updateData() {
    return (dispatch, getState) => {
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
                        showDesktopNotifications(newMessages, dispatch, getState);
                    } else {
                        document.title = DOCUMENT_TITLE;
                    }
                })
        }
    }
}

const showDesktopNotifications = (conversations, dispatch, getState) => {
    conversations.forEach(c => {
        const convId = c._id;
        const unreadMessages = c.messages.filter(e => !e.read);
        const messageHash = convId + unreadMessages.map(e => e.timestamp).sort().toString();

        Promise.resolve()
            .then(() => {
                if (getState().startup.isUserInMessenger) {
                    dispatch({
                        type: actions.BLOCKED_MESSAGES,
                        payload: getState().startup.blockedNotifications.concat(messageHash)
                    })
                }
            })
            .then(() => {
                const blockedNotifications = getState().startup.blockedNotifications;
                if (!blockedNotifications.includes(messageHash)) {
                    const messagesArr = unreadMessages.map(e => e.text);
                    const senders = [...new Set(unreadMessages.map(e => e.from.username))];
                    const title = `Message from ${senders.join(', ')}`;
                    const notification = new Notification(title, {
                        tag: convId,
                        icon: 'favicon.png',
                        body: messagesArr.join('\n'),
                        vibrate: [200, 100, 200]
                    });
                    notification.onclick = () => {
                        window.open(`${window.location.origin}/conversation?convId=${convId}`);
                        notification.close();
                    };

                    // do not show the same notification again
                    dispatch({
                        type: actions.BLOCKED_MESSAGES,
                        payload: blockedNotifications.concat(messageHash)
                    });
                }
            });
    });
};