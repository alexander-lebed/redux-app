// @flow
/* eslint-disable no-underscore-dangle */
import { compose, applyMiddleware, combineReducers, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import thunkMiddleware from 'redux-thunk';
import todoReducer from './reducers/todo-reducer';
import weatherReducer from './reducers/weather-reducer';


const reducers = combineReducers({
    todos: todoReducer,
    locations: weatherReducer
});
const middleware = [thunkMiddleware];
const store = createStore(
    reducers,
    compose(
        applyMiddleware(...middleware),
        autoRehydrate(),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

// periodically persist the store
persistStore(store, { transforms: [immutableTransform()] });
// Note: use persistStore(...).purge() to reset the store

export default store;
