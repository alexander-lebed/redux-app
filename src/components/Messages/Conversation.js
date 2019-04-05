// @flow
import React from 'react';
import { connect } from 'react-redux';
import Linkify from 'react-linkify';
import queryString from 'query-string';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { alertSuccess } from '../../redux/reducers/alerts';
import { getConversationsByUser, getConversation, getConversationWithUsers, markAsRead, deleteMessage, saveConversation, conversationCleanup } from '../../redux/reducers/conversations';
import { orderBy, timestampToHumanDate } from '../../utils';
import { ONLINE_STYLE } from '../../constants';
import Spinner from '../common/Spinner';
import PeopleSelector from '../common/PeopleSelector';
import MessageForm from './MessageForm';
import type { User, Conversation as ConversationType, Message, Translation } from '../../types';


type Props = {
    user: User,
    users: Array<User>,
    conversation: ConversationType,
    conversations: Array<ConversationType>,
    isConversationsLoaded: boolean,
    isConversationLoaded: boolean,
    translation: Translation,
    location: Object,
    getConversationsByUser: Function,
    getConversation: Function,
    getConversationWithUsers: Function,
    markAsRead: Function,
    deleteMessage: Function,
    saveConversation: Function,
    conversationCleanup: Function,
    alertSuccess: Function
}

type State = {
    showModal: boolean
};

class Conversation extends React.Component<Props, State> {

    state: State;
    interval: IntervalID;
    scrollableTable: Object | null;

    constructor(params: Props) {
        super(params);
        this.state = {
            showModal: false,
        };
        this.scrollableTable = {};
    }

    componentDidMount() {
        if (!this.props.isConversationsLoaded) {
            this.props.getConversationsByUser(this.props.user._id);
        }
        this.getConversation();
        setTimeout(() => this.props.markAsRead(), 800);
    }

    componentDidUpdate(prevProps: Props) {
        this.scrollConversationToBottom();
        const prevMessages = prevProps.conversation.messages || [];
        const currentMessages = this.props.conversation.messages || [];
        if (prevMessages.length !== currentMessages.length) {
            setTimeout(() => this.props.markAsRead(), 500);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.props.conversationCleanup();
    }

    scrollConversationToBottom = () => {
        if (this.scrollableTable) {
            const el = this.scrollableTable;
            const isScrolledToBottom = el.scrollHeight - el.clientHeight <= el.scrollTop + 1;
            if (!isScrolledToBottom) {
                el.scrollTop = el.scrollHeight - el.clientHeight;
            }
        }
    };

    getConversation = () => {
        const query = queryString.parse(this.props.location.search);
        const {convId, userIds} = query;
        if (convId) {
            this.props.getConversation(convId);
        } else if (userIds) {
            let members = [];
            if (Array.isArray(userIds)) {
                members = userIds.concat(this.props.user._id);
            } else {
                const isConvWithOneself = this.props.user._id === userIds;
                members = isConvWithOneself ? [userIds] : [this.props.user._id, userIds];
            }
            this.props.getConversationWithUsers(members);
        }
    };

    showMembersModal = (show: boolean) => this.setState({showModal: show});

    manageMembers = (people: Array<User>) => {
        const {conversation, saveConversation, alertSuccess, translation} = this.props;
        const users = people.map(e => ({_id: e._id, username: e.username}));
        conversation.users = users;
        saveConversation(conversation);
        this.showMembersModal(false);
        alertSuccess(translation.MESSAGES.MEMBERS_EDITED(users.map(e => e.username)));
    };

    render() {
        const {user, conversation, conversations, isConversationsLoaded, isConversationLoaded, translation} = this.props;

        const conversationsExist = conversations.some(e => e._id === conversation._id);
        const isLoading = !isConversationsLoaded || !isConversationLoaded;

        let content = null;
        if (isLoading) {
            content = (
                <div style={{paddingTop: '50vh'}}>
                    <Spinner />
                </div>
            )
        } else if (conversationsExist) {
            const userIsMember = conversation.users.map(e => e._id).includes(user._id);
            if (userIsMember) {
                content = (
                    <div>
                        {this.renderMessages()}
                        <MessageForm />
                    </div>
                );
            } else {
                content = (
                    <Jumbotron className='text-center'>
                        <p>{translation.MESSAGES.YOU_NOT_MEMBER}</p>
                    </Jumbotron>
                );
            }
        } else {
            content = (
                <Jumbotron className='text-center'>
                    <p>{translation.CONVERSATIONS.CONVERSATION_NOT_FOUND}</p>
                </Jumbotron>
            )
        }
        return (
            <Container fluid>
                <Row>
                    <Col md={{span: 10, offset: 1}} lg={{span: 8, offset: 2}}>
                        <div className='header'>
                            <div style={{color: 'grey'}}>
                                <i className='fas fa-search' style={{marginRight: 8}} />
                                {translation.CONVERSATIONS.SEARCH_IN_MESSAGES}
                            </div>
                            <Button
                                variant='outline-dark'
                                className='d-none d-sm-block'
                                size='sm'
                                onClick={() => this.showMembersModal(true)}
                            >
                                <i className='fa fa-users fa-lg' style={{marginRight: 8}} />
                                {translation.MESSAGES.MANAGE_MEMBERS}
                            </Button>
                            <Button
                                variant='outline-dark'
                                className='d-block d-sm-none btn-mobile-icon'
                                title={translation.MESSAGES.MANAGE_MEMBERS}
                                onClick={() => this.showMembersModal(true)}
                            >
                                <i className='fa fa-users fa-lg' />
                            </Button>
                        </div>
                        {
                            content
                        }
                        {conversation.users &&
                        <Modal
                            size='lg'
                            show={this.state.showModal}
                            onHide={() => this.showMembersModal(false)}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>{translation.MESSAGES.MANAGE_MEMBERS}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <PeopleSelector
                                    selectedUserIds={conversation.users.map(e => e._id)}
                                    onSubmit={(people) => this.manageMembers(people)}
                                    onCancel={() => this.showMembersModal(false)}
                                />
                            </Modal.Body>
                            <Modal.Footer className='manage-people-footer text-danger'>
                                <i className='fas fa-exclamation-triangle' style={{marginRight: 8}}/> {translation.MESSAGES.NEW_MEMBERS_NOTE}
                            </Modal.Footer>
                        </Modal>
                        }
                    </Col>
                </Row>
            </Container>
        )
    }

    renderMessages = () => {
        const messages = this.props.conversation.messages || [];
        const orderedMessages = orderBy(messages.filter(e => !e.deleted), 'timestamp');
        return ( // className='messages-table custom-scrollbar'
            <div className='messages-table' ref={(e) => {this.scrollableTable = e}}>
                <Table>
                    <tbody>
                        {orderedMessages.map((message, index) => {
                            const rowClass = !message.read ? 'unread-message' : '';
                            return (
                                <tr key={index} className={rowClass}>
                                    <td style={{padding: 8}}>
                                        {this.renderMessage(message)}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    };

    renderMessage = (message: Message) => {
        const {user, users, deleteMessage, translation} = this.props;
        const isMessageFromCurrentUser = message.from._id === user._id;
        const messageUser: User = users.find(e => e._id === message.from._id);
        return (
            <div>
                <div className='profile-picture-wrapper'>
                    <Image
                        roundedCircle
                        style={messageUser.online ? ONLINE_STYLE : {}}
                        className='profile-picture'
                        src={messageUser.pictureUrl ? messageUser.pictureUrl : '/default-profile.png'}
                    />
                </div>
                <div className='message-top'>
                    <div>
                        <span className='message-from'>
                            {message.from.username}
                        </span>
                        <span className='message-time'>
                            {timestampToHumanDate(message.timestamp, true, translation)}
                        </span>
                        <Linkify properties={{target: '_blank'}}>
                            <div className='message-text'>
                                {message.text}
                            </div>
                        </Linkify>
                    </div>
                    {isMessageFromCurrentUser &&
                    <div>
                        <i
                            id='delete'
                            className='far fa-trash-alt pull-right cursor'
                            title={translation.MESSAGES.DELETE}
                            style={{color: 'grey'}}
                            onClick={() => deleteMessage(message._id)}
                        />
                    </div>
                    }
                </div>
            </div>
        )
    };
}

export default connect(
    state => ({
        user: state.authentication.user,
        users: state.users.users,
        conversation: state.conversations.conversation,
        conversations: state.conversations.conversations,
        isConversationsLoaded: state.conversations.isConversationsLoaded,
        isConversationLoaded: state.conversations.isConversationLoaded,
        translation: state.translation
    }),
    { getConversationsByUser, getConversation, getConversationWithUsers, markAsRead, deleteMessage, saveConversation, conversationCleanup, alertSuccess }
)(Conversation);