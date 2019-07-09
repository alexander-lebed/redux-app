// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'font-awesome/css/font-awesome.min.css';
import configureStore from './redux/configureStore';
import App from './App';

async function init() {
    const store = await configureStore();
    const app = document.getElementById('app');
    if (app) {
        render(
            <Provider store={store}>
                <App />
            </Provider>,
            app
        );
    }
}

init();
