// @flow
import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron';
import { alertSuccess } from '../../redux/reducers/alerts';
import { getConversationsByUser, getConversation, getConversationWithUsers, markAsRead, deleteMessage, saveConversation, conversationCleanup } from '../../redux/reducers/conversations';
import { orderBy } from '../../utils';
import Spinner from '../common/Spinner';
import PeopleSelector from '../common/PeopleSelector';
import Message from './Message';
import MessageForm from './MessageForm';
import type { User, Conversation as ConversationType, Message as MessageType, Translation } from '../../types';


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
    showModal: boolean,
    messages: Array<MessageType>,
    filteredMessages: Array<MessageType>,
};

class Conversation extends React.Component<Props, State> {

    state: State;
    interval: IntervalID;
    scrollableTable: Object | null;

    constructor(params: Props) {
        super(params);
        this.state = {
            showModal: false,
            messages: [],
            filteredMessages: [],
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

    static getDerivedStateFromProps(props, state) {
        if (props.conversation.messages !== state.messages) {
            return {
                messages: props.conversation.messages,
                filteredMessages: props.conversation.messages
            }
        }
        return null;
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

    onSearch = (value) => {
        if (value === '') {
            this.setState({
                filteredMessages: this.props.conversation.messages // back to original list
            });
        } else {
            const result = this.props.conversation.messages.filter(message => {
                return message.text.toLowerCase().indexOf(value.toLowerCase()) !== -1;
            });
            this.setState({
                filteredMessages: result
            });
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
                                <div style={{color: 'grey'}}>
                                    <InputGroup size='sm' className='search-container'>
                                        <InputGroup.Prepend>
                                            <i className='fas fa-search' />
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            placeholder={translation.CONVERSATIONS.SEARCH_IN_MESSAGES}
                                            aria-label='Search messages'
                                            aria-describedby='search'
                                            className='search-input'
                                            onChange={e => this.onSearch(e.target.value)}
                                        />
                                    </InputGroup>
                                </div>
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
        const messages = this.state.filteredMessages;
        const notDeleted = (messages.filter(e => !e.deleted));
        let synced = [];
        let notSynced = [];
        notDeleted.forEach(message => {
            if (message.timestamp) {
                synced.push(message);
            } else {
                notSynced.push(message);
            }
        });
        const orderedSynced = orderBy(synced, 'timestamp');
        const renderRows = (messageArr: Array<MessageType>) => {
            return messageArr.map((message, index) => {
                const rowClass = !message.read ? 'unread-message' : '';
                return (
                    <tr key={message._id || index} className={rowClass}>
                        <td style={{padding: 8}}>
                            <Message message={message} />
                        </td>
                    </tr>
                )
            })
        };
        return (
            <div className='messages-table' ref={(e) => {this.scrollableTable = e}}>
                <Table>
                    <tbody>
                        {renderRows(orderedSynced)}
                        {renderRows(notSynced)}
                    </tbody>
                </Table>
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