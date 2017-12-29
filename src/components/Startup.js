import React from 'react';
import { connect } from "react-redux";
import { initApp, updateData } from "../redux/reducers/startup";
import Spinner from './common/Spinner';

type Props = {
    loading: boolean,
    children?: React.Node,
    initApp: Function,
    updateData: Function,
    destroyApp: Function
}

class Startup extends React.Component<void, Props, void> {

    interval: number;

    constructor(params: any) {
        super(params);
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