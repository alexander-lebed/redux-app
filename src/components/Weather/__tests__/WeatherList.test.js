// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { WeatherList } from '../WeatherList';
import { Location } from '../Location';


describe('<WeatherList/>', () => {

    const data = [
        {id: 'Odessa(OD),Ukraine', city: 'Odessa', region: 'OD', country: 'Ukraine', temp: 0, isDeleted: false},
        {id: 'NewYork(NY),UnitedStates', city: 'New York', region: 'NY', country: 'United States', temp: 0, isDeleted: false}
    ];

    test('should match snapshot', () => {
        const wrapper = renderer.create(
            <WeatherList
                locations={data}
                updateData={jest.fn()}
            />
        );
        const tree = wrapper.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render locations', () => {
        const wrapper = mount(
            <WeatherList
                locations={data}
                updateData={jest.fn()}
            />
        );
        expect(wrapper.find(Location).length).toEqual(2);
    });
});
