// @flow
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import store from './redux/store';
import {Provider} from 'react-redux';
import Navigation from './components/NavigationBar';
import TodoList from './components/Todo/TodoList'
import WeatherList from './components/Weather/WeatherList'

const Content = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={TodoList} />
                <Route exact path="/todo" component={TodoList} />
                <Route path="/weather" component={WeatherList} />
            </Switch>
        </Router>
    )
};

render(
    <Provider store={store}>
        <div>
            <Navigation />
            <Content />
        </div>
    </Provider>,
    document.getElementById('app')
);