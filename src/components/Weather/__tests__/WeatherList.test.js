// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { List, Map } from 'immutable';
import { WeatherList } from '../WeatherList';
import { Location } from '../Location';


describe('<WeatherList/>', () => {

    const data = Map({
        locations: List([
            Map({id: '9hrptuontk1', city: 'Odessa', country: 'Ukraine', temp: 0, isDeleted: false}),
            Map({id: 't4t6hhe6bf2', city: 'New York', country: 'United States', temp: 0, isDeleted: false})
        ])
    });

    test('should match snapshot', () => {
        const wrapper = renderer.create(
            <WeatherList
                currentData={data}
                addLocation={jest.fn()}
                updateData={jest.fn()}
                removeLocation={jest.fn()}
            />
        );
        const tree = wrapper.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render locations', () => {
        const wrapper = mount(
            <WeatherList
                currentData={data}
                addLocation={jest.fn()}
                updateData={jest.fn()}
                removeLocation={jest.fn()}
            />
        );
        expect(wrapper.find(Location).length).toEqual(2);
    });
});
