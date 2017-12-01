// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import type { State } from '../../redux/types';
import { addTodo, updateTodo, toggleTodo, removeTodo } from '../../redux/actions/todo-actions';
import Todo from './Todo';


type Props = {
    currentData: State,
    addTodo: (text: string) => void,
    updateTodo: (id: string, text: string) => void,
    toggleTodo: (id: string) => void,
    removeTodo: (id: string) => void
}

export class TodoList extends React.Component<void, Props, void> {

    onSubmit = (event: Object) => {
        const text = event.target.value;
        const isEnterKey = event.which === 13;
        if (isEnterKey && text.length > 0) {
            this.props.addTodo(text);
            event.target.value = '';
        }
    };

    render() {
        const { currentData, updateTodo, toggleTodo, removeTodo } = this.props;
        const todos = currentData.get('todos');
        return (
            <div className="todo">
                <Row>
                    <Col xs={3} />
                    <Col xs={6}>
                        <input
                            type="text"
                            className='todo__entry'
                            placeholder="Add todo"
                            onKeyDown={this.onSubmit}
                        />
                        <ul className="todo__list">
                            {todos.filter(t => !t.get('isDeleted')).map(t => (
                                <li
                                    key={t.get('id')}
                                    className="todo__item"
                                    onClick={() => toggleTodo(t.get('id'))}
                                >
                                    <Todo
                                        todo={t}
                                        onEdit={(id, text) => updateTodo(id, text)}
                                        onDelete={() => removeTodo(t.get('id'))}
                                    />
                                </li>
                            ))}
                        </ul>
                    </Col>
                    <Col xs={3} />
                </Row>
            </div>
        );
    }
}

export default connect(
    state => ({ currentData: state.todo }),
    { addTodo, updateTodo, toggleTodo, removeTodo }
)(TodoList);
