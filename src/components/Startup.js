import React from 'react';
import { connect } from "react-redux";
import { initApp } from "../redux/reducers/startup";

type Props = {
    loading: boolean,
    children?: React.Node,
    initApp: Function
}

class Startup extends React.Component<void, Props, void> {

    componentDidMount() {
        this.props.initApp();
    }

    // todo: replace Loading with spinner
    render() {
        if (this.props.loading) {
            return (
                <div>Loading...</div>
            )
        }
        return this.props.children;
    }
}

export default connect(
    (state) => ({
        loading: state.startup.loading
    }),
    { initApp }
)(Startup);