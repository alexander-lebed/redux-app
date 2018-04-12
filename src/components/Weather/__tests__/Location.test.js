// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Location from '../Location';


describe('<Location/>', () => {
    test('should render Location', () => {
        const location = {id: 'Odessa(OD),Ukraine', city: 'Odessa', region: 'OD', country: 'Ukraine', temp: 0, isDeleted: false};
        const wrapper = renderer.create(
            <Location location={location} onDelete={jest.fn()} />
        );
        const tree = wrapper.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

