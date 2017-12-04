// @flow
import { List, Map } from 'immutable';
import uid from '../../../helpers/id-generator';
import reducer from '../todo';
import { addTodo, updateTodo, toggleTodo, removeTodo } from '../../actions/todo-actions';


describe('Todo Reducer', () => {
    const initAction = { type: '', payload: null };
    const initState = Map({
        todos: List([
            Map({ id: uid(), isDone: false, text: 'Todo 1', isDeleted: false }),
            Map({ id: uid(), isDone: false, text: 'Todo 2', isDeleted: false })
        ])
    });

    test('should have default init state', () => {
        const state = reducer(undefined, initAction);
        expect(state.get('todos').size > 0).toBe(true);
        initState.get('todos').forEach((e) => {
            expect(e.get('id').length > 0).toBe(true);
        });
    });

    test('should add todo', () => {
    // add item
        const state = reducer(initState, addTodo('new todo'));
        const target = state.get('todos').find(e => e.get('text') === 'new todo');
        expect(target).not.toEqual(null);
        expect(target && target.get('isDone')).toBe(false);
        expect(target && target.get('isDeleted')).toBe(false);
    });

    test('should update todo', () => {
        let state = reducer(initState, initAction);
        const someItemId = state.get('todos').get(1).get('id');
        // update item
        state = reducer(state, updateTodo(someItemId, 'updated todo'));
        const target = state.get('todos').find(e => e.get('id') === someItemId);
        expect(target && target.get('text')).toEqual('updated todo');
    });

    test('should toggle todo', () => {
        let state = reducer(initState, addTodo('new todo'));
        let target = state.get('todos').find(e => e.get('text') === 'new todo');
        expect(target && target.get('isDone')).toBe(false);
        const targetId = target ? target.get('id') : '';
        // toggle item
        state = reducer(state, toggleTodo(targetId));
        target = state.get('todos').find(e => e.get('id') === targetId);
        expect(target && target.get('isDone')).toBe(true);
    });

    test('should remove todo', () => {
        let state = reducer(initState, addTodo('new todo'));
        let target = state.get('todos').find(e => e.get('text') === 'new todo');
        expect(target && target.get('isDeleted')).toBe(false);
        const targetId = target ? target.get('id') : '';
        // remove item
        state = reducer(state, removeTodo(targetId));
        target = state.get('todos').find(e => e.get('id') === targetId);
        expect(target && target.get('isDeleted')).toBe(true);
    });
});
