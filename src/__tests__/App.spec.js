import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import $http from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { WebSocket } from 'mock-socket';
import configureStore from '../redux/configureStore';
import App from '../App';
import { IMGUR_AUTH_GET_API, USERS_URL } from '../constants';

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
const Notification = {
    requestPermission: jest.fn()
};
global.localStorage = localStorageMock;
global.WebSocket = WebSocket;
global.Notification = Notification;

jest.mock('hellojs', () => ({
    init: () => {}
}));

describe('App integration test', () => {

    let mockAdapter;
    let store;

    beforeEach(async () => {
        mockAdapter = new MockAdapter($http);
        store = await configureStore();
    });

    test('should land on Login page', async (done) => {
        mockAdapter.onGet(IMGUR_AUTH_GET_API).reply(200);
        mockAdapter.onGet(USERS_URL).reply(200, []);
        const wrapper = await mount(
            <Provider store={store}>
                <App />
            </Provider>
        );
        setTimeout(() => {
            wrapper.update();
            const LoginPage = wrapper.find('Login');
            expect(LoginPage.exists()).toEqual(true);
            done();
        }, 500);
    });
});