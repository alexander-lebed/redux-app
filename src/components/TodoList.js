import React from 'react';
import {connect} from 'react-redux';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {addTodo, toggleTodo, removeTodo} from '../actions/todo-actions';


const TodoList = (props) => {
    const {todos, addTodo, toggleTodo, removeTodo} = props;

    const onSubmit = (event) => {
        let text = event.target.value;
        const isEnterKey = event.which === 13
        if (isEnterKey && text.length > 0) {
            addTodo(text);
            event.target.value = '';
        }
    };

    const toggleClick = id => event => toggleTodo(id);
    const onDelete = id => event => removeTodo(id);

    return (
        <div className="todo">
            <Row>
                <Col xs={3} />
                <Col xs={6}>
                    <input
                        type="text"
                        className='todo__entry'
                        placeholder="Add todo"
                        onKeyDown={onSubmit}
                    />
                    <ul className="todo__list">
                        {todos.filter(t => !t.get('isDeleted')).map(t => (
                            <li
                                key={t.get('id')}
                                className="todo__item"
                                onClick={toggleClick(t.get('id'))}
                            >
                                <Todo todo={t} onDelete={onDelete(t.get('id'))} />
                            </li>
                        ))}
                    </ul>
                </Col>
                <Col xs={3} />
            </Row>
        </div>
    );
};

const Todo = (props) => {
    const {todo, onDelete} = props;
    return <div>
        {todo.get('isDone') ? <strike>{todo.get('text')}</strike> : <span>{todo.get('text')}</span>}
        <Glyphicon
            glyph="remove"
            className="pull-right"
            onClick={onDelete}
        />
    </div>
};

export default connect(
    // mapStateToProps
    (state) => {
        return {
            todos: state.todos
        }
    },
    // mapDispatchToProps
    (dispatch) => {
        return {
            addTodo: text => dispatch(addTodo(text)),
            toggleTodo: id => dispatch(toggleTodo(id)),
            removeTodo: id => dispatch(removeTodo(id))
        };
    }
)(TodoList)