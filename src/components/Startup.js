// @flow
import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Offline } from "react-detect-offline";
import { initApp } from '../redux/reducers/startup';
import type { Translation } from '../types';

type Props = {
    children?: Node,
    translation: Translation,
    initApp: Function
}

/*
    1. Load required data
    2. Authorize user
    3. Alert if no connection
 */
class Startup extends React.Component<Props, void> {

    componentDidMount() {
        this.props.initApp();
    }

    render() {
        return (
            <div>
                {this.props.children}

                <Offline>
                    <Modal show={true}>
                        <Modal.Body style={{textAlign: 'center', color: 'red'}}>
                            {this.props.translation.OTHER.NO_CONNECTION}
                        </Modal.Body>
                    </Modal>
                </Offline>
            </div>

        )
    }
}

export default connect(
    (state) => ({
        translation: state.translation
    }),
    { initApp }
)(Startup);