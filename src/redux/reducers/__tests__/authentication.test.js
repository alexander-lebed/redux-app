import configureMockStore from 'redux-mock-store';
import { WebSocket } from 'mock-socket';
import thunk from 'redux-thunk';
import $http from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { USERS_URL } from '../../../constants';
import reducer, { login, online, logout } from '../authentication';

global.WebSocket = WebSocket;

jest.mock('hellojs', () => ({
    use: () => ({
        api: () => ({
            id: '12345',
            first_name: 'FirstName',
            email: 'newname@email.com',
            thumbnail: '/images/default-profile.jpg'
        }),
        login: () => Promise.resolve(true),
        logout: () => Promise.resolve(true),
    })
}));

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Authentication reducer', () => {

    const getOfflineUser = () => {
        return {
            _id: '111',
            username:'Current User',
            email: 'user@mail.com',
            password: 'user-password',
            online: false,
            lastTime: 1519294933743,
            oauth: ''
        }
    };
    const getOnlineUser = () => ({...getOfflineUser(), ...{online: true}});
    const USERS_PUT_API = `${USERS_URL}/${getOfflineUser()._id}`;
    const initialState = {
        authentication: {
            user: null
        },
        users: {
            users: [
                getOfflineUser(),
                {
                    _id: '222',
                    username:'Alice',
                    email: 'alice@gmail.com',
                    password: 'alice-password',
                    online: true,
                    lastTime: 1518346740388,
                    oauth: ''
                },
                {
                    _id: '333',
                    username:'Bob',
                    email: 'bob@mail.com',
                    password: 'bob-password',
                    online: true,
                    lastTime: 1518346740388,
                    oauth: 'facebook'
                }
            ]
        }
    };
    const mockAdapter = new MockAdapter($http);
    let store = mockStore(initialState);

    afterEach(() => {
        store.clearActions();
    });

    test('check initial state', async () => {
        expect(reducer(undefined, {})).toEqual(initialState.authentication)
    });

    test('should login existing user', async () => {
        mockAdapter.onPut(USERS_PUT_API).reply(200, getOnlineUser());
        // TEST ACTION
        const setUserAction = {type: 'SET_USER', payload: getOnlineUser()};
        const expectedActions = [setUserAction];
        const isLoggedIn = await store.dispatch(login({email: getOnlineUser().email, password: getOnlineUser().password, oauth: getOnlineUser().oauth}));
        expect(isLoggedIn).toBe(true);
        expect(store.getActions()).toEqual(expectedActions);
        // TEST REDUCER
        expect(reducer({}, setUserAction)).toEqual({user: getOnlineUser()});
    });

    test('should login new OAUTH user', async () => {
        const oauthUser = {
            _id: '3132333435xxxxxxxxxxxxxx',
            username: 'New Name',
            email: 'newname@email.com',
            password: '',
            online: true,
            pictureUrl: '/images/default-profile.jpg',
            lastTime: null,
            oauth: 'google'
        };
        mockAdapter.onPut(`${USERS_URL}/${oauthUser._id}`).reply(200, oauthUser);
        // TEST ACTION
        const setUserAction = {type: 'SET_USER', payload: oauthUser};
        const expectedActions = [setUserAction];
        const isLoggedIn = await store.dispatch(login({oauth: oauthUser.oauth}));
        expect(isLoggedIn).toBe(true);
        expect(store.getActions()).toEqual(expectedActions);
        // TEST REDUCER
        expect(reducer({}, setUserAction)).toEqual({user: oauthUser});
    });

    test('should login existing OAUTH user', async () => {
        const getOauthUser = () => initialState.users.users[2];
        mockAdapter.onPut(`${USERS_URL}/${getOauthUser()._id}`).reply(200, getOauthUser());
        // TEST ACTION
        const setUserAction = {type: 'SET_USER', payload: getOauthUser()};
        const expectedActions = [setUserAction];
        const isLoggedIn = await store.dispatch(login(getOauthUser()));
        expect(isLoggedIn).toBe(true);
        expect(store.getActions()).toEqual(expectedActions);
        // TEST REDUCER
        expect(reducer({}, setUserAction)).toEqual({user: getOauthUser()});
    });

    test('should go user offline', async () => {
        store = mockStore({
            ...initialState,
            ...{authentication: {user: getOnlineUser()}} // mock logged-in user
        });
        mockAdapter.onPut(USERS_PUT_API).reply(200, getOfflineUser());
        // TEST ACTION
        const setUserAction = {type: 'SET_USER', payload: getOfflineUser()};
        const expectedActions = [setUserAction];
        await store.dispatch(online(false));
        expect(store.getActions()).toEqual(expectedActions);
        // TEST REDUCER
        expect(reducer({}, setUserAction)).toEqual({user: getOfflineUser()});
    });

    test('should logout user', async () => {
        mockAdapter.onPut(USERS_PUT_API).reply(200, getOfflineUser());
        // TEST ACTION
        const setUserAction = {type: 'SET_USER', payload: null};
        const expectedActions = [setUserAction];
        await store.dispatch(logout());
        expect(store.getActions()).toEqual(expectedActions);
        // TEST REDUCER
        expect(reducer({}, setUserAction)).toEqual({user: null});
    });

    test('should logout OAUTH user', async () => {
        const getOauthUser = () => initialState.users.users[2];
        store = mockStore({
            ...initialState,
            ...{authentication: {user: getOauthUser()}} // mock logged-in user
        });
        mockAdapter.onPut(`${USERS_URL}/${getOauthUser()._id}`).reply(200, getOauthUser());
        // TEST ACTION
        const setUserAction = {type: 'SET_USER', payload: null};
        const expectedActions = [setUserAction];
        await store.dispatch(logout());
        expect(store.getActions()).toEqual(expectedActions);
        // TEST REDUCER
        expect(reducer({}, setUserAction)).toEqual({user: null});
    });
});

