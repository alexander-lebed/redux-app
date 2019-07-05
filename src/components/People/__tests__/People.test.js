// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { People, UserRow } from '../People';
import ConfirmationModal from '../../common/ConfirmationModal';
import translation from '../../../lang/en';

jest.mock('react-redux', () => ({
    connect: (mapStateToProps, mapDispatchToProps) => (ReactComponent) => ({
        mapStateToProps,
        mapDispatchToProps,
        ReactComponent
    }),
    useSelector: () => ({
        loggedUser: {email: 'alexanderlebed999@gmail.com'},
        translation: {PEOPLE: {}, COMMON: {}},
        COMMON: {}
    })
}));

describe('<People/>', () => {
    const props = {
        user: {
            _id: '111',
            username: 'Current User',
            email: 'alexanderlebed999@gmail.com',
            password: 'password',
            pictureUrl: '',
            online: true,
            lastTime: 1519294933743,
            oauth: ''
        },
        users: [
            {
                _id: '111',
                username: 'Current User',
                email: 'alexanderlebed999@gmail.com',
                password: 'user-password',
                pictureUrl: '',
                online: true,
                lastTime: 1519294933743,
                oauth: ''
            },
            {
                _id: '222',
                username: 'Alice',
                email: 'alice@gmail.com',
                password: 'alice-password',
                pictureUrl: '',
                online: true,
                lastTime: 1518346740388,
                oauth: ''
            },
            {
                _id: '333',
                username: 'Bob',
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
        history: { push: jest.fn() }
    };

    const targetUser = props.users[1];

    test('should match snapshot', () => {
        const wrapper = renderer.create(<People {...props} />);
        const tree = wrapper.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render people', () => {
        const wrapper = shallow(<People {...props} />);
        let userRows = wrapper.find(UserRow);
        expect(userRows.exists()).toEqual(true);
        expect(userRows.length).toEqual(3);
        expect(wrapper.instance().props.users).toEqual(props.users);
    });

    test('should alert confirmation on delete user', () => {
        const wrapper = mount(<People {...props} />);
        let confirmation = wrapper.find(ConfirmationModal);
        expect(confirmation.exists()).toEqual(false);
        expect(wrapper.instance().state.deleteUserId).toEqual('');

        const button = wrapper.find(`button#delete-user-${targetUser._id}`);
        expect(button.exists()).toEqual(true);
        button.simulate('click');
        confirmation = wrapper.find(ConfirmationModal);
        expect(confirmation.exists()).toEqual(true);
        expect(wrapper.instance().state.deleteUserId).toEqual(targetUser._id);
    });

    test('should route to conversation on \'write message\' click', () => {
        const spyPush = jest.spyOn(props.history, 'push');
        const wrapper = mount(<People {...props} />);
        expect(spyPush).toHaveBeenCalledTimes(0);

        const button = wrapper.find(`button#write-user-${targetUser._id}`);
        expect(button.exists()).toEqual(true);
        button.simulate('click');
        expect(spyPush).toHaveBeenCalledTimes(1);
        expect(spyPush).toHaveBeenLastCalledWith(`/conversation?userIds=${targetUser._id}`);
        spyPush.mockRestore();
    });

    test('should expand user image on image click', () => {
        const wrapper = mount(<People {...props} />);
        let userPictureModal = wrapper.find(`.profile-modal`);
        expect(userPictureModal.exists()).toEqual(false);

        const userPicture = wrapper.find(`img#user-picture-${targetUser._id}`);
        expect(userPicture.exists()).toEqual(true);
        userPicture.simulate('click');
        userPictureModal = wrapper.find(`.profile-modal`);
        expect(userPictureModal.exists()).toEqual(true);
    });
});