// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import queryString from 'query-string';
import { Row, Col, Table, FormGroup, FormControl, InputGroup, ButtonToolbar, Button, Glyphicon, Image } from 'react-bootstrap';
import { MAIN_COLOR } from '../../constants';
import { timestampToHumanDate } from '../../helpers/time';
import { deleteUser } from '../../redux/reducers/users';
import ConfirmationModal from '../common/ConfirmationModal';
import type { User } from '../../types';

type Props = {
    history: Object;
    user: User,
    users: Map<string, User>,
    deleteUser: Function
}

type State = {
    searchText: string,
    deleteUserId: string
}

export class People extends React.Component<Props, State> {

    state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            searchText: '',
            deleteUserId: ''
        }
    }

    showDeleteConfirmation = (userId: string) => {
        this.setState({
            deleteUserId: userId
        })
    };

    hideDeleteConfirmation = () => {
        this.setState({
            deleteUserId: ''
        })
    };

    deleteUser = () => {
        this.props.deleteUser(this.state.deleteUserId);
        this.hideDeleteConfirmation();
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
                <Col xsOffset={0} smOffset={1} mdOffset={3} xs={12} sm={10} md={6}>
                    <Row>
                        <Col xs={12} sm={6}>
                            <FormGroup>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        placeholder='Search people'
                                        value={this.state.searchText}
                                        onChange={e => this.setState({searchText: e.target.value})}
                                    />
                                    <InputGroup.Addon>
                                        <Glyphicon glyph='search' />
                                    </InputGroup.Addon>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    {users.length === 0 ? <div className='text-center'>No results</div> :
                        <Table>
                            <tbody>
                                {users.map(user => {
                                    const imageStyle = user.online ? {border: `2px solid ${MAIN_COLOR}`, float: 'left'} : {float: 'left'};
                                    return (
                                        <tr key={user._id} id={user._id}>
                                            <td>
                                                <Row>
                                                    <Col xs={12} sm={6} style={{paddingTop: 5}}>
                                                        <Image
                                                            circle
                                                            style={imageStyle}
                                                            className='profile-picture'
                                                            src={user.pictureUrl ? user.pictureUrl : '/default-profile.png'}
                                                            alt={'Image'}
                                                        />
                                                        <div>
                                                            {user.username}
                                                            <div style={style.time}>
                                                                {!user.online && `last seen ${timestampToHumanDate(user.lastTime)}`}
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} sm={6}>
                                                        <ButtonToolbar className='pull-right'>
                                                            {this.isAdmin() &&
                                                            <Button
                                                                id={`remove-user-${user._id}`}
                                                                bsSize='small'
                                                                bsStyle='danger'
                                                                onClick={() => this.showDeleteConfirmation(user._id)}
                                                            >
                                                                Delete
                                                            </Button>
                                                            }
                                                            <Button
                                                                id={`write-user-${user._id}`}
                                                                bsSize='small'
                                                                onClick={() => this.goToConversationWith([user._id])}
                                                            >
                                                                Write a message
                                                            </Button>
                                                        </ButtonToolbar>
                                                    </Col>
                                                </Row>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    }
                    {this.state.deleteUserId &&
                        <ConfirmationModal
                            title={'Delete confirmation'}
                            body={'Are you sure you want to delete this user?'}
                            onConfirm={() => this.deleteUser()}
                            onCancel={() => this.hideDeleteConfirmation()}
                        />
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