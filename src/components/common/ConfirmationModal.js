import React from 'react'
import { connect } from 'react-redux';
// import type { Node } from 'react';
import { Modal, ButtonToolbar, Button, Glyphicon } from 'react-bootstrap';

// type Props = {
//   title: Node | string,
//   body: Node | string,
//   onConfirm: Function,
//   onCancel: Function,
//   inProgress?: boolean
// }

class ConfirmationModal extends React.Component<void, void> {
    render() {
        const Spinner = (
            <div className='text-center'>
                <Glyphicon glyph="cog" className='glyphicon-spin' />
            </div>
        );
        return (
            <Modal show onHide={this.props.onCancel}>
                <Modal.Header>
                    <Modal.Title>
                        {this.props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.inProgress ? Spinner : this.props.body}
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar className='pull-right'>
                        <Button
                            id='confirm-btn'
                            bsStyle='primary'
                            disabled={this.props.inProgress}
                            onClick={this.props.onConfirm}
                        >
                            {this.props.translation.COMMON.YES}
                        </Button>
                        <Button
                            id='cancel-btn'
                            disabled={this.props.inProgress}
                            onClick={this.props.onCancel}
                        >
                            {this.props.translation.COMMON.CANCEL}
                        </Button>
                    </ButtonToolbar>
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
