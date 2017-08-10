// @flow
import { combineReducers, createStore } from 'redux';
import todos from './reducers/todo-reducer';
import locations from './reducers/weather-reducer';


const combined = combineReducers({ todos, locations });
const store = createStore(combined);

export default store;
