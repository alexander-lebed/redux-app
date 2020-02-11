// @flow
import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { initApp } from '../redux/reducers/startup';

type Props = {
    children?: Node,
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
        );
    }
}

Startup.defaultProps = {
    children: []
};

export default connect(
    (state) => ({
        translation: state.translation
    }),
    { initApp }
)(Startup);
