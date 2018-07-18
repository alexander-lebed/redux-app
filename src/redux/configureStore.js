// @flow
import { compose, applyMiddleware, combineReducers, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import thunkMiddleware from 'redux-thunk';
import startup from './reducers/startup';
import authentication from './reducers/authentication';
import users from './reducers/users';
import conversations from './reducers/conversations'
import weather from './reducers/weather';
import alerts from './reducers/alerts';
import locale from './reducers/locale';
import translation from './reducers/translation';


export default function configureStore() {
    const middleware = [thunkMiddleware];
    return new Promise((resolve, reject) => {
        try {
            const reducers = combineReducers({
                startup,
                authentication,
                users,
                conversations,
                weather,
                alerts,
                locale,
                translation
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
                {
                    whitelist : ['authentication', 'users', 'weather', 'locale'],
                    transforms: [immutableTransform()]
                },
                () => resolve(store)
            ); // .purge();
        } catch (e) {
            reject(e);
        }
    });
}
