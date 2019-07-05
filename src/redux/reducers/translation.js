// @flow
import moment from 'moment';
import { setLocale } from './locale';
import enStrings from '../../lang/en';
import ruStrings from '../../lang/ru';
import type { Action, Dispatch, Locale, Translation } from '../../types';

const actions = {
    SET_STRINGS: 'SET_STRINGS'
};

const strings = (state: Translation = enStrings, action: Action) => {
    switch (action.type) {
        case actions.SET_STRINGS: {
            return {...action.payload};
        }
        default:
            return state;
    }
};

export default strings;

export function initTranslation() {
    return (dispatch: Dispatch, getState: Function) => {
        dispatch(translate(getState().locale));
    }
}

export function translate(locale: Locale) {
    return (dispatch: Dispatch) => {

        dispatch(setLocale(locale));

        moment.locale(locale);

        if (locale === 'ru') {
            dispatch({
                type: actions.SET_STRINGS,
                payload: ruStrings
            })
        } else {
            dispatch({
                type: actions.SET_STRINGS,
                payload: enStrings
            })
        }
    }
}