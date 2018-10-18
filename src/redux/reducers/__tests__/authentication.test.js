import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import $http from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Map } from 'immutable';
import { USERS_URL } from '../../../constants';
import { login, online, logout } from '../authentication';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Authentication reducer', () => {

    process.env.WS_ADDRESS = 'ws://localhost:3000';
    const mockAdapter = new MockAdapter($http);

    const testUser = {
        _id: '111',
        username:'Current User',
        email: 'user@mail.com',
        password: 'user-password',
        online: true,
        lastTime: 1519294933743,
        oauth: ''
    };
    const store = mockStore({
        authentication: {
            user: testUser
        },
        user: testUser,
        users: {
            users: Map({
                '111': testUser,
                '222': {
                    _id: '222',
                    username:'Alice',
                    email: 'alice@gmail.com',
                    password: 'alice-password',
                    online: true,
                    lastTime: 1518346740388,
                    oauth: ''
                },
                '333': {
                    _id: '333',
                    username:'Bob',
                    email: 'bob@mail.com',
                    password: 'bob-password',
                    online: true,
                    lastTime: 1518346740388,
                    oauth: ''
                }
            })
        }
    });
    const USERS_PUT_API = `${USERS_URL}/${testUser._id}`;

    afterEach(() => {
        store.clearActions();
    });

    test('should successfully login user', async () => {
        mockAdapter.onPut(USERS_PUT_API).reply(200, testUser);
        const expectedActions = [
            {type: 'SET_USER', payload: testUser}
        ];
        const isLoggedIn = await store.dispatch(login({email: 'user@mail.com', password: 'user-password', oauth: ''}));
        expect(isLoggedIn).toBe(true);
        expect(store.getActions()).toEqual(expectedActions);
    });

    test('should successfully logout user', async () => {
        mockAdapter.onPut(USERS_PUT_API).reply(200, testUser);
        const expectedActions = [
            {type: 'SET_USER', payload: null}
        ];
        await store.dispatch(logout());
        expect(store.getActions()).toEqual(expectedActions);
    });

    test('should go user offline', async () => {
        const response = {...testUser, online: false};
        mockAdapter.onPut(USERS_PUT_API).reply(200, response);
        const expectedActions = [
            {type: 'SET_USER', payload: response}
        ];
        await store.dispatch(online(false));
        expect(store.getActions()).toEqual(expectedActions);
    });
});

