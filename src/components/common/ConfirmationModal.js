// @flow
import React from 'react'
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import type { Node } from 'react';
import type { Translation } from '../../types';

type Props = {
    title: Node | string,
    body: Node | string,
    translation: Translation,
    onConfirm: Function,
    onCancel: Function,
}

class ConfirmationModal extends React.Component<Props, void> {
    render() {
        return (
            <Modal show onHide={this.props.onCancel}>
                <Modal.Header >
                    <Modal.Title>
                        {this.props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.body}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='success'
                        size='sm'
                        onClick={this.props.onConfirm}
                    >
                        {this.props.translation.COMMON.YES}
                    </Button>
                    <Button
                        variant='outline-dark'
                        size='sm'
                        onClick={this.props.onCancel}
                    >
                        {this.props.translation.COMMON.CANCEL}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default connect(
    (state) => ({
        translation: state.translation
    }), {}
)(ConfirmationModal)
