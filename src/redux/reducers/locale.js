// @flow
import type { Action, Dispatch, Locale } from '../../types';

const actions = {
    SET_LOCALE: 'SET_LOCALE'
};

const locale = (state: Locale = 'en', action: Action) => {
    switch (action.type) {
        case actions.SET_LOCALE: {
            return String(action.payload);
        }
        default:
            return state;
    }
};

export default locale;

export function setLocale(locale: Locale) {
    return (dispatch: Dispatch) => {
        dispatch({
            type: actions.SET_LOCALE,
            payload: locale
        });
    }
}