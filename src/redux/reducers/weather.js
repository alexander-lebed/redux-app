// @flow
import _ from 'lodash';
import type {Action, Dispatch, State, Location} from '../../types';


const actions = {
    UPDATE_DATA: 'UPDATE_DATA'
};

const locations = (state: State = [], action: Action): State => {
    switch (action.type) {
        case actions.UPDATE_DATA: {
            return _.clone(action.payload);
        }
        default:
            return state;
    }
};

export default locations;

export function updateData(locations: Array<Location>) {
    return (dispatch: Dispatch) => {
        dispatch({
            type: actions.UPDATE_DATA,
            payload: locations
        })
    }
}
