// @flow
import React from 'react';
import type { Node } from 'react';
import { connect } from "react-redux";
import { initApp } from "../redux/reducers/startup";

type Props = {
    loading: boolean,
    children?: Node,
    initApp: Function
}

class Startup extends React.Component<Props, void> {

    interval: IntervalID;

    componentDidMount() {
        this.props.initApp();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return this.props.children;
    }
}

export default connect(
    (state) => ({
        loading: state.startup.loading
    }),
    { initApp }
)(Startup);