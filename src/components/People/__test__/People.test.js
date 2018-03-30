// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { Map } from 'immutable';
import { People } from '../People';


describe('<People/>', () => {

    const props = {
        user: {
            _id: '111',
            username:'Current User',
            email: 'user@gmail.com',
            password: 'password',
            online: true,
            lastTime: 1519294933743
        },
        users: Map({
            '111': {
                _id: '111',
                username:'Current User',
                email: 'user@mail.com',
                password: 'user-password',
                online: true,
                lastTime: 1519294933743
            },
            '222': {
                _id: '222',
                username:'Alice',
                email: 'alice@gmail.com',
                password: 'alice-password',
                online: true,
                lastTime: 1518346740388
            },
            '333': {
                _id: '333',
                username:'Bob',
                email: 'bob@mail.com',
                password: 'bob-password',
                online: true,
                lastTime: 1518346740388
            }
        }),
        deleteUser: jest.fn(),
        history: {}
    };

    test('should match snapshot', () => {
        const wrapper = renderer.create(
            <People {...props} />
        );
        const tree = wrapper.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render people', () => {
        const wrapper = mount(
            <People {...props} />
        );
        expect(wrapper.props().users.size).toEqual(3);
    });

    test('should route to conversation', () => {
        props.history = {
            push: sinon.spy()
        };
        const wrapper = mount(
            <People {...props} />
        );

        expect(props.history.push.calledOnce).toBe(false);
        wrapper.find('#write-user-222').simulate('click');
        expect(props.history.push.withArgs('/conversation?userIds=222').calledOnce).toBe(true);
    });
});