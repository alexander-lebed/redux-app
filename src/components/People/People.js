// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import queryString from 'query-string';
import { Row, Col, Table, Button, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { timestampToHumanDate } from '../../helpers/time';
import type { User } from '../../types';

type Props = {
    user: User,
    users: Map<string, User>
}

class People extends React.Component<void, Props, void> {

    render() {
        const {users} = this.props;
        return (
            <Row>
                <Col xsOffset={1} mdOffset={2} xs={10} md={8}>
                    <Table responsive>
                        <tbody>
                            {users.toArray().map(user => {
                                const query = queryString.stringify({userId: user._id});
                                const glyphStyle = {...{color: user.online ? 'green' : 'red'}, ...{marginRight: 15}};
                                return (
                                    <tr key={user._id}>
                                        <td>
                                            <Row style={{marginRight: 0}}>
                                                <Col xs={6}>
                                                    <Glyphicon glyph='user' style={glyphStyle} />
                                                    {user.username}
                                                </Col>
                                                <Col xs={6} style={style.time}>
                                                    {!user.online && `last seen ${timestampToHumanDate(user.lastTime)}`}
                                                    <LinkContainer to={`/conversation?${query}`} className='pull-right'>
                                                        <Button bsSize='small'>
                                                            Write a message
                                                        </Button>
                                                    </LinkContainer>
                                                </Col>
                                            </Row>
                                        </td>


                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        )
    }
}

const style = {
    time: {
        color: 'grey',
        fontSize: 13
    }
};

export default connect(
    state => ({
        user: state.authentication.user,
        users: state.users.users
    }),
    { }
)(People);