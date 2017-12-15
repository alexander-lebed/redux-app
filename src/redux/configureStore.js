// @flow
import { compose, applyMiddleware, combineReducers, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import thunkMiddleware from 'redux-thunk';
import startup from './reducers/startup';
import authentication from './reducers/authentication';
import users from './reducers/users';
import conversations from './reducers/conversations'
import todo from './reducers/todo';
import weather from './reducers/weather';
import alerts from './reducers/alerts';


export default function configureStore() {
    const middleware = [thunkMiddleware];
    return new Promise((resolve, reject) => {
        try {
            const reducers = combineReducers({
                startup,
                authentication,
                users,
                conversations,
                todo,
                weather,
                alerts
            });
            const store = createStore(
                reducers,
                compose(
                    applyMiddleware(...middleware),
                    autoRehydrate(),
                    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
                )
            );
            // periodically persist the store
            // note: use persistStore(...).purge() to reset the store
            persistStore(
                store,
                { transforms: [immutableTransform()] },
                () => resolve(store)
            ); // .purge();
        } catch (e) {
            reject(e);
        }
    });
}
