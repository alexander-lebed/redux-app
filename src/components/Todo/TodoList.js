// @flow
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import type {State, Dispatch} from '../../redux/types';
import {addTodo, updateTodo, toggleTodo, removeTodo} from '../../redux/actions/todo-actions';
import Todo from './Todo';


type Props = {
    todos: State,
    addTodo: (text: string) => void,
    updateTodo: (id: string, text: string) => void,
    toggleTodo: (id: string) => void,
    removeTodo: (id: string) => void
}

export class TodoList extends React.Component<void, Props, void> {

    onSubmit(event: Object) {
        let text = event.target.value;
        const isEnterKey = event.which === 13;
        if (isEnterKey && text.length > 0) {
            this.props.addTodo(text);
            event.target.value = '';
        }
    };

    render() {
        const {todos, updateTodo, toggleTodo, removeTodo} = this.props;

        return (
            <div className="todo">
                <Row>
                    <Col xs={3} />
                    <Col xs={6}>
                        <input
                            type="text"
                            className='todo__entry'
                            placeholder="Add todo"
                            onKeyDown={e => this.onSubmit(e)}
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
    // mapStateToProps
    state => ({todos: state.todos}),
    // mapDispatchToProps
    (dispatch: Dispatch) => {
        return bindActionCreators({addTodo, updateTodo, toggleTodo, removeTodo}, dispatch)
        // return {
        //     addTodo: text => dispatch(addTodo(text)),
        //     toggleTodo: id => dispatch(toggleTodo(id)),
        //     removeTodo: id => dispatch(removeTodo(id))
        // };
    }
)(TodoList)