// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { List, Map } from 'immutable';
import { WeatherList } from '../WeatherList';


describe('<WeatherList/>', () => {
    test('should render WeatherList', () => {
        const locs = List([
            Map({ id: 1, city: 'Odessa', country: 'Ukraine', temp: 0, isDeleted: false }),
            Map({ id: 2, city: 'New York', country: 'United States', temp: 0, isDeleted: false })
        ]);
        const wrapper = renderer.create(
            <WeatherList
                locations={locs}
                addLocation={jest.fn()}
                updateLocations={jest.fn()}
                removeLocation={jest.fn()}
            />
        );
        const tree = wrapper.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
