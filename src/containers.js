import {connect} from 'react-redux';
import * as components from './components';
import {addTodo, toggleTodo, removeTodo} from './todo-actions';


export const TodoList = connect(
    // mapStateToProps
    (state) => {
        return {todos: state.todos};
    },
    // mapDispatchToProps
    (dispatch) => {
        return {
            addTodo: text => dispatch(addTodo(text)),
            toggleTodo: id => dispatch(toggleTodo(id)),
            removeTodo: id => dispatch(removeTodo(id))
        };
    }
)(components.TodoList)
