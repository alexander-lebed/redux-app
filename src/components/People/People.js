// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import queryString from 'query-string';
import { Row, Col, Table, FormGroup, FormControl, InputGroup, ButtonToolbar, Button, Glyphicon, Image, Modal } from 'react-bootstrap';
import { ONLINE_STYLE } from '../../constants';
import { timestampToHumanDate } from '../../helpers/time';
import { deleteUser } from '../../redux/reducers/users';
import ConfirmationModal from '../common/ConfirmationModal';
import type { User, Translation } from '../../types';

type Props = {
    history: Object;
    user: User,
    users: Map<string, User>,
    translation: Translation,
    deleteUser: Function
}

type State = {
    searchText: string,
    deleteUserId: string,
    clickedUser: User | null
}

export class People extends React.Component<Props, State> {

    state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            searchText: '',
            deleteUserId: '',
            clickedUser: null
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

    showUserProfile = (user: User | null) => {
        if (user !== null) {
            console.log(`show ${user.username} modal`);
        }
        this.setState({clickedUser: user});
    };

    render() {
        let {users, translation} = this.props;
        const {PEOPLE, COMMON} = translation;
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
                                        placeholder={PEOPLE.SEARCH_PEOPLE}
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
                    {users.length === 0 ? <div className='text-center'>{COMMON.NO_RESULTS}</div> :
                        <Table>
                            <tbody>
                                {users.map(user => {
                                    const imageStyle = user.online ? ONLINE_STYLE : {};
                                    return (
                                        <tr key={user._id} id={user._id}>
                                            <td>
                                                <Row>
                                                    <Col xs={12} sm={6} style={{paddingTop: 5}}>
                                                        <div
                                                            className='profile-picture-wrapper'
                                                            style={{cursor: 'pointer'}}
                                                            onClick={() => this.showUserProfile(user)}
                                                        >
                                                            <Image
                                                                circle
                                                                style={imageStyle}
                                                                className='profile-picture'
                                                                src={user.pictureUrl ? user.pictureUrl : '/default-profile.png'}
                                                            />
                                                        </div>
                                                        <div>
                                                            {user.username}
                                                            <div style={style.time}>
                                                                {!user.online && `${PEOPLE.LAST_SEEN} ${timestampToHumanDate(user.lastTime, false, translation)}`}
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
                                                                {COMMON.DELETE}
                                                            </Button>
                                                            }
                                                            <Button
                                                                id={`write-user-${user._id}`}
                                                                bsSize='small'
                                                                onClick={() => this.goToConversationWith([user._id])}
                                                            >
                                                                {PEOPLE.WRITE_MESSAGE}
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
                    {this.state.clickedUser !== null &&
                        <Modal show={this.state.clickedUser !== null} onHide={() => this.showUserProfile(null)}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.state.clickedUser.username}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{textAlign: 'center'}}>
                                <Image
                                    style={{maxHeight: 500, maxWidth: 500}}
                                    src={this.state.clickedUser.pictureUrl ? this.state.clickedUser.pictureUrl : '/default-profile.png'}
                                />
                            </Modal.Body>
                        </Modal>
                    }
                    {this.state.deleteUserId &&
                        <ConfirmationModal
                            title={COMMON.DELETE_CONFIRMATION}
                            body={PEOPLE.DELETE_CONFIRMATION}
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
        users: state.users.users,
        translation: state.translation
    }),
    { deleteUser }
)(People);