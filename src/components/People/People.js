// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import queryString from 'query-string';
import { Row, Col, Table, Button, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { MAIN_COLOR } from '../../constants';
import { timestampToHumanDate } from '../../helpers/time';
import { deleteUser } from '../../redux/reducers/users';
import type { User } from '../../types';

type Props = {
    user: User,
    users: Map<string, User>,
    deleteUser: Function
}

class People extends React.Component<void, Props, void> {

    deleteConfirmation = (userId: string) => {
        if (confirm('Are you sure you want to delete this user?')) {
            this.props.deleteUser(userId)
        }
    };

    isAdmin = () => this.props.user.email === 'alexanderlebed999@gmail.com';

    render() {
        const {users} = this.props;
        return (
            <Row style={{marginLeft: 0, marginRight: 0}}>
                <Col xsOffset={0} smOffset={1} mdOffset={2} xs={12} sm={10} md={8}>
                    <Table responsive>
                        <tbody>
                            {users.toArray().map(user => {
                                const query = queryString.stringify({userId: user._id});
                                const glyphStyle = user.online ? {...{color: MAIN_COLOR }, ...{marginRight: 15}} : {marginRight: 15};
                                return (
                                    <tr key={user._id}>
                                        <td>
                                            <Row style={{marginRight: 0}}>
                                                <Col xs={6}>
                                                    <Glyphicon glyph='user' style={glyphStyle} />
                                                    {user.username}
                                                    {this.isAdmin() &&
                                                    <Glyphicon
                                                        id='remove'
                                                        glyph='remove'
                                                        style={{color: 'grey'}}
                                                        className='pull-right cursor'
                                                        onClick={() => this.deleteConfirmation(user._id)}
                                                    />
                                                    }
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
    { deleteUser }
)(People);