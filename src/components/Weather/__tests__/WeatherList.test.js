// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { WeatherList } from '../WeatherList';
import { Location } from '../Location';
import translation from '../../../lang/en';


describe('<WeatherList/>', () => {

    const data = [
        {id: 'Odessa(OD),Ukraine', city: 'Odessa', region: 'OD', country: 'Ukraine', temp: 0, isDeleted: false},
        {id: 'NewYork(NY),UnitedStates', city: 'New York', region: 'NY', country: 'United States', temp: 0, isDeleted: false}
    ];

    const props = {
        locations: data,
        translation: translation,
        updateData: jest.fn()
    };

    test('should match snapshot', () => {
        const wrapper = renderer.create(
            <WeatherList {...props} />
        );
        const tree = wrapper.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render locations', () => {
        const wrapper = mount(
            <WeatherList {...props} />
        );
        expect(wrapper.find(Location).length).toEqual(2);
    });
});