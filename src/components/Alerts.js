// @flow
import React from 'react';
import { connect } from 'react-redux';
import BSAlert from 'react-bootstrap/Alert';
import { actionTypes } from '../redux/reducers/alerts';
import type { Alert as AlertType } from '../types';

type Props = {
    alerts: Array<AlertType>,
    dispatch: Function
}

const Alerts = (props: Props) => {
    return (
        <div className='alerts-container'>
            {props.alerts.map((n) =>
                <Alert key={n.uid} {...n} dispatch={props.dispatch} />
            )}
        </div>
    )
};
Alerts.displayName = 'Alerts';

export default connect(
    state => ({
        alerts: state.alerts
    }),
)(Alerts)


type AlertProps = AlertType & {
    dispatch: Function
}

export class Alert extends React.Component<AlertProps, void> {
    _timeout: TimeoutID;

    componentDidMount() {
        if (this.props.timeout) {
            this._timeout = setTimeout(this.hideNotification, this.props.timeout)
        }
    }

    componentWillUnmount () {
        if (this._timeout) {
            clearTimeout(this._timeout)
        }
    }

    hideNotification = () => {
        this.props.dispatch({
            type: actionTypes.CLEAR,
            payload: {
                uid: this.props.uid
            }
        })
    };

    render () {
        return (
            <BSAlert
                dismissible
                variant={this.props.type}
                className='my-alert'
                onClose={this.hideNotification}
            >
                {this.props.message}
            </BSAlert>
        )
    }
}
Alert.displayName = 'Alert';