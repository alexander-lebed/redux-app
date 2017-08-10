// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { List, Map } from 'immutable';
import { TodoList } from '../TodoList';


describe('<TodoList/>', () => {
  test('should render TodoList', () => {
    const todos = List([
      Map({ id: 1, isDone: false, text: 'todo 1', isDeleted: false }),
      Map({ id: 2, isDone: false, text: 'todo 2', isDeleted: false })
    ]);
    const wrapper = renderer.create(
      <TodoList
        todos={todos}
        addTodo={jest.fn()}
        updateTodo={jest.fn()}
        toggleTodo={jest.fn()}
        removeTodo={jest.fn()}
      />
    );
    const tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
