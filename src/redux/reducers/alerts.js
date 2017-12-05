import uid from '../../helpers/id-generator';
import type { Dispatch, Action, State } from "../../types";

export const actionTypes = {
    CLEAR: 'CLEAR',
    SHOW_DIALOG: 'SHOW_DIALOG',
    SHOW_ERROR: 'SHOW_ERROR',
    SHOW_INFO: 'SHOW_INFO',
    SHOW_SUCCESS: 'SHOW_SUCCESS',
    SHOW_WARNING: 'SHOW_WARNING'
};

const setAlertType = (alertType, alerts, payload) => {
    const newAlert = {...payload, ...{uid: uid(), type: alertType}};
    const id = newAlert.uid;
    return alerts.filter(n => n.uid !== id).concat(newAlert);
};

const alerts = (state = [], action: Action = {}): State => {
    switch (action.type) {
        case actionTypes.SHOW_DIALOG:
            return setAlertType('dialog', state, action.payload);
        case actionTypes.SHOW_ERROR:
            return setAlertType('danger', state, action.payload);
        case actionTypes.SHOW_INFO:
            return setAlertType('info', state, action.payload);
        case actionTypes.SHOW_SUCCESS:
            return setAlertType('success', state, action.payload);
        case actionTypes.SHOW_WARNING:
            return setAlertType('warning', state, action.payload);
        case actionTypes.CLEAR: {
            return state.filter(n => n.uid !== action.payload.uid);
        }
        default:
            return state;
    }
};

export default alerts;


export const success = (message: string, timeout: number = 5000) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: actionTypes.SHOW_SUCCESS,
            payload: {
                message,
                timeout
            }
        });
    }
};

export const error = (message, timeout: number | null = null) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: actionTypes.SHOW_ERROR,
            payload: {
                message,
                timeout
            }
        });
    }
};

export const Alert = {
    success,
    error
};