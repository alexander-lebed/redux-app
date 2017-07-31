import React from 'react';
import $http from 'axios';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';


export const Todo = (props) => {
    const {todo, onDelete} = props;
    return <div>
        {todo.get('isDone') ? <strike>{todo.get('text')}</strike> : <span>{todo.get('text')}</span>}
        <Glyphicon
            glyph="remove"
            className="pull-right"
            onClick={onDelete}
        />
    </div>
}

export const TodoList = (props) => {
    const {todos, addTodo, toggleTodo, removeTodo} = props;

    const onSubmit = (event) => {
        let text = event.target.value;
        const isEnterKey = event.which === 13
        if (isEnterKey && text.length > 0) {
            addTodo(text);
            event.target.value = '';
        }
    }

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
}

export const City = (props) => {
    const {city, onDelete} = props
    return (
       <Row>
           <Col xs={6}>{city.get('city')}</Col>
           <Col xs={3}>{`${city.get('dergees')} F°`}</Col>
           <Col xs={3}>
               <Glyphicon
                   glyph="remove"
                   className="pull-right"
                   onClick={onDelete}
               />
           </Col>
       </Row>
    );
}

export class CityList extends React.Component {

    // componentDidMount = () => {
    //     const {cities} = props;
    //     // const updatedCities = cities.for each get weather
    //     const url = `http://samples.openweathermap.org/data/2.5/weather?q=${city}&appid=12345`
    //     updateCities(updatedCities)
    // }

    render () {
        const {cities, removeCity} = props;
        const onDelete = id => event => removeCity(id);
        return (
            <div className="todo">
                <Row>
                    <Col xs={3} />
                    <Col xs={6}>
                        <ul className="todo__list">
                            {cities.filter(c => !c.get('isDeleted')).map(c => (
                                <li key={c.get('id')} className="todo__item">
                                    <City city={c} onDelete={onDelete(c.get('id'))} />
                                </li>
                            ))}
                        </ul>
                    </Col>
                    <Col xs={3} />
                </Row>
            </div>
        )
    }
}