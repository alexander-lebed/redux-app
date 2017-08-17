// @flow
import React from 'react';
import { Map } from 'immutable';
import Modal from 'react-bootstrap/lib/Modal';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';


type Props = {
    todo: Map<string, any>,
    onEdit: (id: string, text: string) => void,
    onDelete: (id: string) => void
}

type State = {
    todoToEdit: Map<string, any> | null
}

export default class Todo extends React.Component<void, Props, State> {
    state: State = {
        todoToEdit: null
    };

    onEdit = (event: Object) => {
        if (event) {
            // stop the click event from bubbling up
            event.stopPropagation();
        }
        this.setState({
            todoToEdit: this.props.todo
        });
    }

    editTodo = (todo: Map<string, any>) => {
        this.props.onEdit(todo.get('id'), todo.get('text'));
        this.setState({ todoToEdit: null });
    }

    onSubmit = (event: Object) => {
        const isEnterKey = event.which === 13;
        if (isEnterKey && this.state.todoToEdit) {
            this.editTodo(this.state.todoToEdit);
        }
    }

    render() {
        const { todo, onDelete } = this.props;
        const { todoToEdit } = this.state;

        const stateSetter = obj => this.setState(obj);

        let editModal;
        if (todoToEdit) {
            editModal = (
                <Modal show onHide={() => stateSetter({ todoToEdit: null })}>
                    <Modal.Header>
                        <Modal.Title>Edit todo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            type="text"
                            className='todo__entry'
                            value={todoToEdit.get('text')}
                            onChange={e => stateSetter({ todoToEdit: todoToEdit.set('text', e.target.value) })}
                            onKeyDown={this.onSubmit}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            id='confirm-btn'
                            className='pull-right'
                            disabled={false}
                            onClick={() => this.editTodo(todoToEdit)}
                        >
                            EDIT
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        } else {
            editModal = null;
        }

        return (
            <div>
                {todo.get('isDone') ?
                    <strike>{todo.get('text')}</strike> :
                    <span>{todo.get('text')}</span>
                }
                <ButtonToolbar className="pull-right" style={{ marginTop: 3 }}>
                    <Glyphicon
                        id="edit-todo"
                        glyph="pencil"
                        style={{ marginRight: 15, color: 'grey' }}
                        onClick={e => this.onEdit(e)}
                    />
                    <Glyphicon
                        id="remove-todo"
                        glyph="remove"
                        style={{ color: 'grey' }}
                        onClick={onDelete}
                    />
                </ButtonToolbar>
                {editModal && editModal}
            </div>
        );
    }
}
