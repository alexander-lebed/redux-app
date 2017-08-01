import React from 'react';
import {render} from 'react-dom';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import todos from './todo-reducer'
import locations from './weather-reducer'
import {TodoList, LocationList} from './containers';

const combined = combineReducers({todos, locations})

const store = createStore(combined);

render(
    <Provider store={store}>
        <LocationList />
    </Provider>,
    document.getElementById('app')
)