// @flow
import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import { MAIN_COLOR, ONLINE_STYLE } from '../../constants';
import { timestampToHumanDate } from '../../utils';
import { getConversationsByUser, deleteConversation } from '../../redux/reducers/conversations';
import ConfirmationModal from '../common/ConfirmationModal';
import Spinner from '../common/Spinner';
import type { User, Conversation as ConversationType, Translation } from '../../types';

type Props = {
    history: Object,
    // redux props
    user: User,
    conversations: Array<ConversationType>,
    isConversationsLoaded: boolean,
    translation: Translation,
    getConversationsByUser: Function,
    deleteConversation: Function
}

type State = {
    clickedPicture: string,
    deleteConversationId: string
}

class Conversations extends React.Component<Props, State> {
    state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            clickedPicture: '',
            deleteConversationId: ''
        }
    }

    componentDidMount() {
        this.props.getConversationsByUser(this.props.user._id);
    }

    createConversation = () => this.props.history.push('/create-conversation');

    showPictureModal = (url: string) => this.setState({clickedPicture: url});

    hidePictureModal = () =>  this.setState({clickedPicture: ''});

    showDeleteConfirmation = (event, convId: string) => {
        event.stopPropagation();
        this.setState({
            deleteConversationId: convId
        })
    };

    hideDeleteConfirmation = () => this.setState({deleteConversationId: ''});

    deleteConversation = () => {
        this.props.deleteConversation(this.state.deleteConversationId);
        this.hideDeleteConfirmation();
    };

    render() {
        const {user, conversations, isConversationsLoaded, translation, history} = this.props;

        let content = [];
        if (!isConversationsLoaded) {
            content = (
                <div style={{paddingTop: '50vh'}}>
                    <Spinner />
                </div>
            )
        } else if (conversations.length === 0) {
            content = (
                <Jumbotron className='text-center'>
                    <p>{translation.CONVERSATIONS.NO_CONVERSATIONS}</p>
                </Jumbotron>
            )
        } else {
            content = ( // delete on hover: <Table hover className='fa-hover'>
                <Table hover>
                    <tbody>
                        {conversations.map(conversation => (
                            <ConversationPreview
                                key={conversation._id}
                                userId={user._id}
                                conversation={conversation}
                                history={history}
                                showPictureModal={this.showPictureModal}
                                showDeleteConfirmation={this.showDeleteConfirmation}
                            />
                        ))}
                    </tbody>
                </Table>
            )
        }
        return (
            <Container fluid>
                <Row>
                    <Col md={{span: 10, offset: 1}} lg={{span: 8, offset: 2}}>
                        <div className='header'>
                            <div style={{color: 'grey'}}>
                                {/* {translation.CONVERSATIONS.SEARCH_IN_CONVERSATIONS} */}
                            </div>
                            <Button
                                variant='outline-dark'
                                size='sm'
                                className='d-none d-sm-block'
                                onClick={() => this.createConversation()}
                            >
                                <i className='fa fa-comments fa-lg' style={{marginRight: 8}} />
                                {translation.CONVERSATIONS.NEW_CONVERSATION}
                            </Button>
                            <Button
                                variant='outline-dark'
                                className='d-block d-sm-none btn-mobile-icon'
                                title={translation.CONVERSATIONS.NEW_CONVERSATION}
                                onClick={() => this.createConversation()}
                            >
                                <i className='fa fa-comments fa-lg' />
                            </Button>
                        </div>
                        {
                            content
                        }
                        {this.state.clickedPicture &&
                        <Modal
                            show={this.state.clickedPicture !== null}
                            className='profile-modal'
                            onHide={this.hidePictureModal}
                        >
                            <Modal.Body style={{textAlign: 'center'}}>
                                <Image
                                    className='profile-modal-picture'
                                    src={this.state.clickedPicture}
                                />
                            </Modal.Body>
                        </Modal>
                        }

                        {this.state.deleteConversationId &&
                        <ConfirmationModal
                            title={translation.COMMON.DELETE_CONFIRMATION}
                            body={translation.CONVERSATIONS.DELETE_CONFIRMATION}
                            onConfirm={() => this.deleteConversation()}
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
        conversations: state.conversations.conversations,
        isConversationsLoaded: state.conversations.isConversationsLoaded,
        translation: state.translation
    }),
    { getConversationsByUser, deleteConversation }
)(Conversations);


type PreviewProps = {
    userId: string,
    conversation: ConversationType,
    history: Object,
    showPictureModal: Function,
    showDeleteConfirmation: Function,
    // redux props
    users: Array<User>,
    translation: Translation,
}

const ConversationPreview = connect(
    state => ({
        user: state.authentication.user,
        users: state.users.users,
        translation: state.translation
    }),
    {  }
)((props: PreviewProps) => {
    const {conversation, userId, users, translation, history, showPictureModal, showDeleteConfirmation} = props;
    const messages = conversation.messages.filter(e => !e.deleted);
    const unreadMessages = messages.filter(m => !m.read && m.from._id !== userId);
    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
    const messageTextClass = lastMessage && !lastMessage.read ? 'unread-message' : '';

    const userIds =  conversation.users.map(u => u._id);
    let senders: Array<User> = users.filter(u => userIds.includes(u._id));
    if (senders.length > 1) {
        senders = senders.filter(u => u._id !== userId); // exclude recipient
    }
    const lastSender = senders[0];
    let pictureUrl;
    if (senders.length === 1) {
        pictureUrl = lastSender.pictureUrl ? lastSender.pictureUrl : '/images/default-profile.jpg';
    } else {
        pictureUrl = '/images/conversation-group.jpg';
    }

    const goToConversation = (convId: string) => {
        history.push(`/conversation?${queryString.stringify({convId})}`);
    };
    return (
        <tr key={conversation._id} className={unreadMessages.length > 0 ? 'new-messages-bg' : ''}>
            <td className='conversation-td'>
                <Row noGutters>
                    <Col xs={7} sm={10}>
                        {/* Sender info */}
                        <div className='profile-picture-wrapper'>
                            {senders.length === 1 ?
                                <Image
                                    roundedCircle
                                    style={lastSender.online ? ONLINE_STYLE : {}}
                                    className='profile-picture'
                                    src={pictureUrl}
                                    onClick={() => showPictureModal(pictureUrl)}
                                />
                                :
                                <Image
                                    roundedCircle
                                    style={senders.some(e => e.online) ? ONLINE_STYLE : {}}
                                    className='profile-picture'
                                    src={pictureUrl}
                                    onClick={() => showPictureModal(pictureUrl)}
                                />
                            }
                        </div>
                        <div style={{color: '#343a40'}} onClick={() => goToConversation(conversation._id)}>
                            {senders.length === 1 ?
                                <strong>
                                    {lastSender.username}
                                </strong>
                                :
                                <div className='cut-senders-text'>
                                    {senders.map(sender => (
                                        <strong key={sender._id} style={sender.online ? {color: MAIN_COLOR} : {}}>
                                            {sender.username}
                                        </strong>
                                    )).reduce((prev, curr) => [prev, ', ', curr])}
                                </div>
                            }
                        </div>
                        {/* Last message details (desktop only) */}
                        {lastMessage &&
                        <Row className='message-preview d-none d-sm-flex' onClick={() => goToConversation(conversation._id)}>
                            <Col xs={4} sm={2} className='user-from-text' style={{paddingRight: 0}}>
                                {lastMessage.from.username}:
                            </Col>
                            <Col xs={8} sm={8} style={{paddingLeft: 10}}>
                                <div className={`conversation-text ${messageTextClass}`}>
                                    {lastMessage.text}
                                </div>
                            </Col>
                        </Row>
                        }
                    </Col>
                    {/* Message time and delete btn */}
                    <Col xs={5} sm={2} className='conversation-actions' onClick={() => goToConversation(conversation._id)}>
                        {unreadMessages.length > 0 &&
                        <Badge  variant='success' style={{marginRight: 15}}>
                            {unreadMessages.length}
                        </Badge>
                        }
                        {timestampToHumanDate(conversation.timestamp, false, translation)}
                        <i
                            className='far fa-trash-alt'
                            title={translation.CONVERSATIONS.DELETE}
                            style={{paddingLeft: 10}}
                            onClick={(event) => showDeleteConfirmation(event, conversation._id)}
                        />
                    </Col>
                </Row>
                {/* Last message details (mobile only) */}
                {lastMessage &&
                <Row className='message-preview d-flex d-sm-none' onClick={() => goToConversation(conversation._id)}>
                    <Col xs={4} sm={2} className='user-from-text'>
                        {lastMessage.from.username}:
                    </Col>
                    <Col xs={8} sm={8} style={{paddingLeft: 10}}>
                        <div className={`conversation-text ${messageTextClass}`}>
                            {lastMessage.text}
                        </div>
                    </Col>
                </Row>
                }
            </td>
        </tr>
    )
});
ConversationPreview.displayName = 'ConversationPreview';