// @flow
/* eslint-disable no-underscore-dangle */
import { compose, applyMiddleware, combineReducers, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import thunkMiddleware from 'redux-thunk';
import todoReducer from './reducers/todo-reducer';
import weatherReducer from './reducers/weather-reducer';


export default function configureStore() {
    const middleware = [thunkMiddleware];
    return new Promise((resolve, reject) => {
        try {
            const reducers = combineReducers({
                todoData: todoReducer,
                weatherData: weatherReducer
            });
            const store = createStore(
                reducers,
                compose(
                    applyMiddleware(...middleware),
                    autoRehydrate(),
                    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                )
            );
            persistStore(
                store,
                { transforms: [immutableTransform()] },
                () => resolve(store)
            );
            // periodically persist the store
            // note: use persistStore(...).purge() to reset the store
        } catch (e) {
            reject(e);
        }
    });
}
