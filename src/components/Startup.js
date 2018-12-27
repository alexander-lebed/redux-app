// @flow
import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
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
 */
class Startup extends React.Component<Props, void> {

    componentDidMount() {
        this.props.initApp();
    }

    render() {
        return (
            <div>
                {this.props.children}
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