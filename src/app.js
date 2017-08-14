// @flow
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import Navigation from './components/NavigationBar';
import TodoList from './components/Todo/TodoList';
import WeatherList from './components/Weather/WeatherList';

const Content = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={TodoList} />
            <Route exact path="/todo" component={TodoList} />
            <Route path="/weather" component={WeatherList} />
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
