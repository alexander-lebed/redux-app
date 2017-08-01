import {connect} from 'react-redux';
import * as components from './components';
import {addTodo, toggleTodo, removeTodo} from './todo-actions';
import {addLocation, updateLocations, removeLocation} from './weather-actions';


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

export const LocationList = connect(
    (state) => {
        return {
            locations: state.locations
        }
    },
    (dispatch) => {
        return {
            addLocation: id => dispatch(addLocation(id)),
            updateLocations: locations => dispatch(updateLocations(locations)),
            removeLocation: id => dispatch(removeLocation(id))
        }
    }
)(components.LocationList)
