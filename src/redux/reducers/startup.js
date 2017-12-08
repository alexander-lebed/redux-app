import { combineReducers } from 'redux';
import type { Action, Dispatch } from '../../types';
import { getUsers } from './users';
// import { login } from './authentication';

const actions = {
    START_INIT: 'START_INIT',
    END_INIT: 'END_INIT'
};

const loading = (state = false, action: Action) => {
    switch (action.type) {
        case actions.START_INIT:
            return true;
        case actions.END_INIT:
            return false;
        default:
            return state;
    }
};

export default combineReducers({
    loading
});


export function initApp() {
    return (dispatch: Dispatch) => {
        dispatch({
            type: actions.START_INIT
        });
        Promise.resolve()
            .then(() => dispatch(getUsers()))
            // .then(() => { // todo: auth current user
            //     const currentUser = getState().authentication.user;
            //     if (currentUser) {
            //         dispatch(login(currentUser.email, currentUser.password))
            //     }
            // })
            .then(() => {
                dispatch({
                    type: actions.END_INIT
                });
            });
    }
}