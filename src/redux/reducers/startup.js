import { combineReducers } from 'redux';
import $http from 'axios';
import hello from 'hellojs';
import { login, online } from './authentication';
import { initTranslation } from './translation';
import { getUsers } from './users';
import { Alert } from './alerts';
import receiveMessageDataURI from '../../../audio';
import { IMGUR_AUTH_GET_API } from '../../constants';

const actions = {
    WINDOW_ACTIVE: 'UPDATE_USER_ACTIVE',
    BLOCKED_MESSAGES: 'BLOCKED_MESSAGES'
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
    isUserInMessenger,
    blockedNotifications
});


export function initApp() {
    return async (dispatch, getState) => {

        dispatch(initTranslation());

        initOAuth();

        await dispatch(getUsers());

        let currentUser = getState().authentication.user;
        if (currentUser) {
            // re-login user
            const isLoggedIn = await dispatch(login(currentUser));
            if (!isLoggedIn) {
                dispatch(Alert.error(getState().translation.AUTH.PLEASE_RELOGIN));
            }
        }

        const clearBrowserNotifications = () => {
            dispatch({type: actions.BLOCKED_MESSAGES, payload: []});
        };

        const askUserToShowNotifications = () => {
            if (Notification && Notification.permission !== 'granted') {
                Notification.requestPermission();
            }
        };

        const watchIfUserOnline = () => {
            window.addEventListener('focus', () => dispatch({type: actions.WINDOW_ACTIVE, payload: true}));
            window.addEventListener('blur',  () => dispatch({type: actions.WINDOW_ACTIVE, payload: false}));
        };

        const watchWhenUserLeaveOrReload = () => {
            currentUser = getState().authentication.user;
            const confirmLeave = (event) => {
                event.preventDefault();
                if (currentUser && currentUser.online) {
                    dispatch(online(false)); // go user offline on page leave
                    setTimeout(() => dispatch(online(true)), 3000); // back to online if user click Cancel
                    return event.returnValue = 'Are you sure you what to leave?';
                }
                return null;
            };
            window.addEventListener('beforeunload', (event) => confirmLeave(event));
            window.addEventListener('unload', (event) => confirmLeave(event));
        };

        clearBrowserNotifications();
        askUserToShowNotifications();
        watchIfUserOnline();
        watchWhenUserLeaveOrReload();
    }
}

function initOAuth() {
    initSocialMediaOAuth();
    initImageHostOAuth();
}

function initSocialMediaOAuth() {
    hello.init({
        google: '949472211637-1593m31t8lmrvrf6cec1kobmajjli70m.apps.googleusercontent.com',
        facebook: '203639747170364',
    }, {
        redirect_uri: '/redirect',
        scope: 'email'
    });
}

function initImageHostOAuth() {
    $http.get(IMGUR_AUTH_GET_API)
        .catch(err => {
            console.log(`--- Imgur OAuth error: ${err}`);
        })
}

export function showBrowserNotifications(conversations, dispatch, getState) {
    conversations.forEach(c => {
        const convId = c._id;
        const unreadMessages = c.messages.filter(e => !e.read);
        const messageHash = convId + unreadMessages.map(e => e.timestamp).sort().toString();

        Promise.resolve()
            .then(() => {
                if (getState().startup.isUserInMessenger) {
                    // save the hash of current unread messages to check it then
                    dispatch({
                        type: actions.BLOCKED_MESSAGES,
                        payload: getState().startup.blockedNotifications.concat(messageHash)
                    })
                }
            })
            .then(() => {
                const blockedNotifications = getState().startup.blockedNotifications;
                if (!blockedNotifications.includes(messageHash)) {
                    // if hash wasn't saved it means user was out of the messenger => show notification

                    const beepSound = new Audio(receiveMessageDataURI);
                    beepSound.play();

                    const messagesArr = unreadMessages.map(e => e.text);
                    const senders = [...new Set(unreadMessages.map(e => e.from.username))];
                    const title = getState().translation.MESSAGES.MESSAGE_FROM(senders.join(', '));
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

                    // save the hash to not show the same notification again
                    dispatch({
                        type: actions.BLOCKED_MESSAGES,
                        payload: blockedNotifications.concat(messageHash)
                    });
                }
            });
    });
}