// @flow
import React from 'react';
import { connect, useSelector } from 'react-redux';
import queryString from 'query-string';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { ONLINE_STYLE, adminEmail } from '../../constants';
import { timestampToHumanDate } from '../../utils';
import { deleteUser } from '../../redux/reducers/users';
import ConfirmationModal from '../common/ConfirmationModal';
import type { User, Translation } from '../../types';

type Props = {
    history: Object,
    user: User,
    users: Array<User>,
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

    showUserProfile = (user: User | null) => this.setState({clickedUser: user});

    showDeleteConfirmation = (userId: string) => this.setState({deleteUserId: userId});

    hideDeleteConfirmation = () => this.setState({deleteUserId: ''});

    deleteUser = () => {
        this.props.deleteUser(this.state.deleteUserId);
        this.hideDeleteConfirmation();
    };

    render() {
        let {users, history, translation} = this.props;
        const {PEOPLE, COMMON} = translation;
        if (this.state.searchText) {
            users = users.filter(e => e.username.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1)
        }
        return (
            <Container fluid>
                <Row>
                    <Col md={{span: 10, offset: 1}} lg={{span: 8, offset: 2}}>
                        <Row>
                            <Col xs={12} sm={6}>
                                <InputGroup size='sm' className='search-container'>
                                    <InputGroup.Prepend>
                                        <i className='fas fa-search' />
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        placeholder={PEOPLE.SEARCH_PEOPLE}
                                        aria-label='Search people'
                                        aria-describedby='search'
                                        className='search-input'
                                        value={this.state.searchText}
                                        onChange={e => this.setState({searchText: e.target.value})}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        {users.length === 0
                            ?  <Jumbotron className='text-center'>{COMMON.NO_RESULTS}</Jumbotron>
                            : <Table>
                                <tbody>
                                    {users.map(user => (
                                        <UserRow
                                            key={user._id}
                                            history={history}
                                            user={user}
                                            showUserProfile={u => this.showUserProfile(u)}
                                            showDeleteConfirmation={userId => this.showDeleteConfirmation(userId)}
                                        />
                                    ))}
                                </tbody>
                            </Table>
                        }
                        {this.state.clickedUser &&
                        <Modal
                            show={this.state.clickedUser !== null}
                            className='profile-modal'
                            onHide={() => this.showUserProfile(null)}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>{this.state.clickedUser.username}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{textAlign: 'center'}}>
                                <Image
                                    className='profile-modal-picture'
                                    src={this.state.clickedUser.pictureUrl ? this.state.clickedUser.pictureUrl : '/images/default-profile.jpg'}
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
            </Container>
        )
    }
}

export default connect(
    state => ({
        user: state.authentication.user,
        users: state.users.users,
        translation: state.translation
    }),
    { deleteUser }
)(People);


type UserRowProps = {
    history: Object,
    user: User,
    showUserProfile: Function,
    showDeleteConfirmation: Function
}
export const UserRow = ((props: UserRowProps) => {
    const {user, showUserProfile, showDeleteConfirmation, history} = props;
    const {loggedUser, translation} = useSelector(state => ({
        loggedUser: state.authentication.user,
        translation: state.translation
    }));

    const isAdmin = loggedUser.email === adminEmail;

    const imageStyle = user.online ? ONLINE_STYLE : {};

    const goToConversationWith = (userIds: Array<string>) => {
        const query = queryString.stringify({userIds});
        history.push(`/conversation?${query}`);
    };
    return (
        <tr key={user._id} id={user._id}>
            <td style={{padding: 10}}>
                <Row>
                    <Col xs={12} sm={6}>
                        <div
                            className='profile-picture-wrapper cursor'
                            onClick={() => showUserProfile(user)}
                        >
                            <Image
                                id={`user-picture-${user._id}`}
                                roundedCircle
                                style={imageStyle}
                                className='profile-picture'
                                src={user.pictureUrl ? user.pictureUrl : '/images/default-profile.jpg'}
                            />
                        </div>
                        <div>
                            {user.username}
                            <div className='last-seen'>
                                {!user.online && `${translation.PEOPLE.LAST_SEEN} ${timestampToHumanDate(user.lastTime, false, translation)}`}
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={6}>
                        <div className='pull-right pt-1 pt-sm-2'>
                            {isAdmin &&
                            <>
                                <Button
                                    id={`delete-user-${user._id}`}
                                    size='sm'
                                    variant='outline-danger'
                                    onClick={() => showDeleteConfirmation(user._id)}
                                >
                                    <i className='far fa-trash-alt' style={{marginRight: 5}} /> {translation.COMMON.DELETE}
                                </Button>
                                {' '}
                            </>
                            }
                            <Button
                                id={`write-user-${user._id}`}
                                size='sm'
                                variant='outline-dark'
                                onClick={() => goToConversationWith([user._id])}
                            >
                                <i className='far fa-paper-plane' style={{marginRight: 5}} /> {translation.PEOPLE.WRITE_MESSAGE}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </td>
        </tr>
    )
});
UserRow.displayName = 'UserRow';