// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import queryString from 'query-string';
import { Row, Col, Table, FormGroup, FormControl, Button, Glyphicon } from 'react-bootstrap';
import { MAIN_COLOR } from '../../constants';
import { timestampToHumanDate } from '../../helpers/time';
import { deleteUser } from '../../redux/reducers/users';
import type { User } from '../../types';

type Props = {
    history: Object;
    user: User,
    users: Map<string, User>,
    deleteUser: Function
}

type State = {
    searchText: string
}

export class People extends React.Component<void, Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        }
    }

    deleteConfirmation = (userId: string) => {
        if (confirm('Are you sure you want to delete this user?')) {
            this.props.deleteUser(userId)
        }
    };

    goToConversationWith = (userIds: Array<string>) => {
        const query = queryString.stringify({userIds});
        this.props.history.push(`/conversation?${query}`);
    };

    isAdmin = () => this.props.user.email === 'alexanderlebed999@gmail.com';

    render() {
        let {users} = this.props;
        users = users.toArray();
        if (this.state.searchText) {
            users = users.filter(e => e.username.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1)
        }
        return (
            <Row style={{marginLeft: 0, marginRight: 0}}>
                <Col xsOffset={0} smOffset={1} mdOffset={2} xs={12} sm={10} md={8}>
                    <Row>
                        <Col xs={12} sm={5}>
                            <FormGroup>
                                <div className="inner-addon left-addon">
                                    <Glyphicon glyph='search' />
                                    <FormControl
                                        type='text'
                                        placeholder='Search people'
                                        value={this.state.searchText}
                                        onChange={e => this.setState({searchText: e.target.value})}
                                    />
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                    {users.length === 0 ? <div className='text-center'>No results</div> :
                        <Table>
                            <tbody>
                                {users.map(user => {
                                    const glyphStyle = user.online ? {...{color: MAIN_COLOR }, ...{marginRight: 15}} : {marginRight: 15};
                                    return (
                                        <tr key={user._id} id={user._id}>
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
                                                        <Button
                                                            id={`write-user-${user._id}`}
                                                            bsSize='small'
                                                            className='pull-right'
                                                            onClick={() => this.goToConversationWith([user._id])}
                                                        >
                                                            Write a message
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    }
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