// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { Map } from 'immutable';
import Location from '../Location';


describe('<Location/>', () => {
    test('should render Location', () => {
        const location = Map({ id: 1, city: 'Odessa', country: 'Ukraine', temp: 80, isDeleted: false });
        const wrapper = renderer.create(
            <Location location={location} onDelete={jest.fn()} />
        );
        const tree = wrapper.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

