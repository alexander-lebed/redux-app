import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import todos from './reducers/todo-reducer'
import locations from './reducers/weather-reducer'
import Navigation from './components/NavigationBar';
import TodoList from './components/TodoList'
import WeatherList from './components/WeatherList'


const combined = combineReducers({todos, locations});
const store = createStore(combined);

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