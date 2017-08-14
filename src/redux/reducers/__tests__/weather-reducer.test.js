// @flow
import { List, Map } from 'immutable';
import uid from '../../../helpers/id-generator';
import reducer from '../weather-reducer';
import { addLocation, updateData, removeLocation } from '../../actions/weather-actions';


describe('Weather Reducer', () => {
    const initAction = { type: '', payload: null };
    const initState = Map({
        locations: List([
            Map({ id: uid(), city: 'Odessa', country: 'Ukraine', temp: 0, isDeleted: false }),
            Map({ id: uid(), city: 'New York', country: 'United States', temp: 0, isDeleted: true })
        ])
    });

    test('should have default init state', () => {
        const state = reducer(undefined, initAction);
        expect(state.get('locations').size > 0).toBe(true);
        state.get('locations').forEach((e) => {
            expect(e.get('id').length > 0).toBe(true);
        });
    });

    test('should add location', () => {
        let state = reducer(initState, initAction);
        let target = state.get('locations').get(1);
        expect(target && target.get('isDeleted')).toBe(true);
        const targetId = target.get('id') || '';
        // make item as added
        state = reducer(state, addLocation(targetId));
        target = state.get('locations').find(e => e.get('id') === targetId);
        expect(target && target.get('isDeleted')).toBe(false);
    });

    test('should update locations', () => {
        const state = reducer(initState, initAction);
        const data = Map({
            locations: List([
                Map({ id: uid(), city: 'Valencia', country: 'Spain', temp: 78, isDeleted: true }),
                Map({ id: uid(), city: 'London', country: 'Great Britain', temp: 72, isDeleted: true })
            ])
        });
        const updatedState = reducer(state, updateData(data));
        expect(state === updatedState).toBe(false);
        expect(updatedState.get('locations').size).toEqual(2);
        expect(updatedState.get('locations').map(e => e.get('city')).contains('Valencia')).toBe(true);
        expect(updatedState.get('locations').map(e => e.get('city')).contains('London')).toBe(true);
    });

    test('should add location', () => {
        let state = reducer(initState, initAction);
        let target = state.get('locations').get(0);
        const targetId = target.get('id') || '';
        expect(target && target.get('isDeleted')).toBe(false);
        // make item as added
        state = reducer(state, removeLocation(targetId));
        target = state.get('locations').find(e => e.get('id') === targetId);
        expect(target && target.get('isDeleted')).toBe(true);
    });
});

