// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { People } from '../People';
import translation from '../../../lang/en';


describe('<People/>', () => {

    const props = {
        user: {
            _id: '111',
            username:'Current User',
            email: 'user@gmail.com',
            password: 'password',
            pictureUrl: '',
            online: true,
            lastTime: 1519294933743,
            oauth: ''
        },
        users: [
            {
                _id: '111',
                username:'Current User',
                email: 'user@mail.com',
                password: 'user-password',
                pictureUrl: '',
                online: true,
                lastTime: 1519294933743,
                oauth: ''
            },
            {
                _id: '222',
                username:'Alice',
                email: 'alice@gmail.com',
                password: 'alice-password',
                pictureUrl: '',
                online: true,
                lastTime: 1518346740388,
                oauth: ''
            },
            {
                _id: '333',
                username:'Bob',
                email: 'bob@mail.com',
                password: 'bob-password',
                pictureUrl: '',
                online: true,
                lastTime: 1518346740388,
                oauth: ''
            }
        ],
        deleteUser: jest.fn(),
        translation: translation,
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
        expect(wrapper.props().users.length).toEqual(3);
    });

    xit('should route to conversation', () => {
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