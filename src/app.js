// @flow
import React from 'react';
import { render } from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from './helpers/history';
import PrivateRoute from './components/PrivateRoute';
import configureStore from './redux/configureStore';
import Navigation from './components/NavigationBar';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import TodoList from './components/Todo/TodoList';
import WeatherList from './components/Weather/WeatherList';

const Content = () => (
    <Router history={history}>
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Registration} />
            <PrivateRoute exact path="/" component={TodoList} />
            <PrivateRoute exact path="/todo" component={TodoList} />
            <PrivateRoute path="/weather" component={WeatherList} />
        </Switch>
    </Router>
);

async function init() {
    const store = await configureStore();
    render(
        <Provider store={store}>
            <div>
                <Navigation />
                <Content />
            </div>
        </Provider>,
        document.getElementById('app')
    );
}

init();
