// @flow
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import Todo from '../Todo';


describe('<Todo/>', () => {
    test('should render Todo', () => {
        const todo = Map({ id: 1, isDone: false, text: 'some text', isDeleted: false });
        const wrapper = renderer.create(
            <Todo todo={todo} onEdit={jest.fn()} onDelete={jest.fn()} />
        );
        const tree = wrapper.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render crossed out Todo as it\'s done', () => {
        const todo = Map({ id: 1, isDone: true, text: 'some text', isDeleted: false });
        const wrapper = shallow(
            <Todo todo={todo} onEdit={jest.fn()} onDelete={jest.fn()} />
        );
        expect(wrapper.find('strike').length).toEqual(1);
    });

    test('should render edit modal on pencil click', () => {
        const todo = Map({ id: 1, isDone: true, text: 'some text', isDeleted: false });
        const wrapper = shallow(
            <Todo todo={todo} onEdit={jest.fn()} onDelete={jest.fn()} />
        );
        wrapper.find('#edit-todo').simulate('click');
        expect(wrapper.find(Modal).length).toEqual(1);
    });
});

