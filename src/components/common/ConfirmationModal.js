// @flow
import React from 'react'
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import type { Node } from 'react';
import type { Translation } from '../../types';

type Props = {
    title: Node | string,
    body: Node | string,
    onConfirm: Function,
    onCancel: Function,
}

const ConfirmationModal = (props: Props) => {
    const translation: Translation = useSelector(state => state.translation);
    return (
        <Modal show onHide={props.onCancel}>
            <Modal.Header >
                <Modal.Title>
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.body}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant='success'
                    size='sm'
                    onClick={props.onConfirm}
                >
                    {translation.COMMON.YES}
                </Button>
                <Button
                    variant='outline-dark'
                    size='sm'
                    onClick={props.onCancel}
                >
                    {translation.COMMON.CANCEL}
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ConfirmationModal;
