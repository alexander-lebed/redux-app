// @flow
import React from 'react';
import type { Node } from 'react';
import { connect } from "react-redux";
import { initApp, updateData } from "../redux/reducers/startup";
import Spinner from './common/Spinner';

type Props = {
    loading: boolean,
    children?: Node,
    initApp: Function,
    updateData: Function
}

/*
todo: go user offline when he close browser/tab
    https://stackoverflow.com/questions/36355093/reactjs-browser-tab-close-event
    https://stackoverflow.com/questions/568977/identifying-between-refresh-and-close-browser-actions
*/
class Startup extends React.Component<void, Props, void> {

    interval: number;

    constructor(props: Props) {
        super(props);
        this.interval = 0;
    }

    componentDidMount() {
        this.props.initApp();
        this.interval = setInterval(() => this.props.updateData(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        if (this.props.loading) {
            return (
                <Spinner />
            )
        }
        return this.props.children;
    }
}

export default connect(
    (state) => ({
        loading: state.startup.loading
    }),
    { initApp, updateData }
)(Startup);