// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Alert as BSAlert, Button, Glyphicon } from 'react-bootstrap';
import { actionTypes } from '../redux/reducers/alerts';
import type { Alert as AlertType } from "../types";


type AlertProps = AlertType & {
    dispatch: Function
}

export class Alert extends React.Component<AlertProps, void> {
    _timeout: TimeoutID;

    componentDidMount () {
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
            <BSAlert bsStyle={this.props.type} style={styles.alert}>
                {this.props.message}
                <Button
                    onClick={this.hideNotification}
                    bsStyle='link'
                    style={styles.closeBtn}
                    className='pull-right close'
                >
                    <Glyphicon glyph='remove' style={{fontSize: 18}} />
                </Button>
            </BSAlert>
        )
    }
}
Alert.displayName = 'Alert';


type StoreProps = {
    alerts: Array<AlertType>
}

type Props = StoreProps & {
    dispatch: Function
}

export class Alerts extends React.Component<Props, void> {
    render () {
        return (
            <div style={styles.alerts}>
                {this.props.alerts.map((n) =>
                    <Alert key={n.uid} {...n} dispatch={this.props.dispatch} />
                )}
            </div>
        )
    }
}
Alerts.displayName = 'Alerts';

export default connect(
    (state): StoreProps => ({
        alerts: state.alerts
    }),
)(Alerts)


const styles = {
    alert: {
        position: 'relative',
        borderRadius: 3
    },
    closeBtn: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    alerts: {
        position: 'fixed',
        top: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '50%',
        maxWidth: 800,
        zIndex: 999,
        fontSize: 14,
        fontFamily: '-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif'
    }
};