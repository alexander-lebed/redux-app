// @flow
import React from 'react';
import { connect } from 'react-redux';
import Linkify from 'react-linkify';
import _ from 'lodash';
import { Map } from 'immutable';
import queryString from 'query-string';
import { Row, Col, Table, Button, Glyphicon, Image, Modal } from 'react-bootstrap';
import { timestampToHumanDate } from '../../helpers/time';
import { getConversationsByUser, getConversation, getConversationWithUsers, markAsRead, deleteMessage, saveConversation, conversationCleanup } from '../../redux/reducers/conversations';
import { alertSuccess } from '../../redux/reducers/alerts';
import Spinner from '../common/Spinner';
import PeopleSelector from '../common/PeopleSelector';
import MessageForm from './MessageForm';
import type { User, Conversation as ConversationType, Message, Translation } from '../../types';
import { ONLINE_STYLE } from '../../constants';

type Props = {
    user: User,
    users: Map<string, User>,
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

    showMembersModal = (show: boolean) => {
        this.setState({
            showModal: show
        })
    };

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

        let body = null;
        if (isLoading) {
            body = (
                <div style={{paddingTop: '50vh'}}>
                    <Spinner />
                </div>
            )
        } else if (conversationsExist) {
            const userIsMember = conversation.users.map(e => e._id).includes(user._id);
            if (userIsMember) {
                body = (
                    <div>
                        {this.renderMessages()}
                        <MessageForm />
                    </div>
                );
            } else {
                body = (
                    <div className='text-center'>
                        {translation.MESSAGES.YOU_NOT_MEMBER}
                    </div>
                );
            }
        } else {
            body = (
                <div className='text-center'>
                    {translation.CONVERSATIONS.CONVERSATION_NOT_FOUND}
                </div>
            )
        }
        return (
            <Row style={{marginLeft: 0, marginRight: 0}}>
                <Col xsOffset={0} smOffset={1} mdOffset={2} xs={12} sm={10} md={8}>
                    <div style={{display: 'table', width: '100%', marginBottom: 15}}>
                        <h4 style={{display: 'table-cell',  width: '100%', verticalAlign: 'middle', paddingTop: 6, paddingBottom: 6}} className='text-center'>
                            {translation.MESSAGES.MESSAGES}
                        </h4>
                        {conversationsExist &&
                        <Button
                            id='create-conversation'
                            title={translation.MESSAGES.MANAGE_MEMBERS}
                            className='pull-right btn-circle-icon'
                            onClick={() => this.showMembersModal(true)}
                        >
                            <i className="fa fa-users fa-lg" />
                        </Button>
                        }
                    </div>

                    {body}

                    {conversation.users &&
                    <Modal
                        bsSize='large'
                        show={this.state.showModal}
                        className='add-people-modal'
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
                        <Modal.Footer style={{textAlign: 'center', color: 'red'}}>
                            {translation.MESSAGES.NEW_MEMBERS_NOTE}
                        </Modal.Footer>
                    </Modal>
                    }
                </Col>
            </Row>
        )
    }

    renderMessages = () => {
        const messages = this.props.conversation.messages || [];
        const orderedMessages = _.orderBy(messages.filter(e => !e.deleted), 'timestamp');
        return (
            <div style={style.scrollableTable} className="custom-scrollbar" ref={(e) => {this.scrollableTable = e}}>
                <Table className='glyphicon-hover'>
                    <tbody>
                        {orderedMessages.map((message, index) => {
                            const rowClass = !message.read ? 'unread-message' : '';
                            return (
                                <tr key={index} className={rowClass}>
                                    <td>{this.renderMessage(message)}</td>
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
        const messageUser: User = users.toArray().find(e => e._id === message.from._id);
        return (
            <div>
                <div className='profile-picture-wrapper'>
                    <Image
                        circle
                        style={messageUser.online ? ONLINE_STYLE : {}}
                        className='profile-picture'
                        src={messageUser.pictureUrl ? messageUser.pictureUrl : '/default-profile.png'}
                    />
                </div>
                <div style={style.top}>
                    <div>
                        <span style={style.from}>
                            {message.from.username}
                        </span>
                        <span style={style.time}>
                            {timestampToHumanDate(message.timestamp, true, translation)}
                        </span>
                        <Linkify properties={{target: '_blank'}}>
                            <div style={style.text}>
                                {message.text}
                            </div>
                        </Linkify>
                    </div>
                    {isMessageFromCurrentUser &&
                    <div>
                        <Glyphicon
                            id='delete'
                            glyph='remove'
                            title={translation.MESSAGES.DELETE}
                            style={{color: 'grey'}}
                            className='pull-right cursor'
                            onClick={() => deleteMessage(message._id)}
                        />
                    </div>
                    }
                </div>
            </div>
        )
    };
}

const style = {
    scrollableTable: {
        overflowY: 'auto',
        maxHeight: '60vh',
        wordBreak: 'break-word',
        marginBottom: 20
    },
    top: {
        display: 'flex',
        justifyContent: 'space-between',
        marginRight: 0,
        fontSize: 13
    },
    from: {
        fontSize: 13,
        fontWeight: 700
    },
    time: {
        color: 'grey',
        paddingLeft: 15
    },
    text: {
        fontSize: 13,
        paddingTop: 5,
        whiteSpace: 'pre-wrap'
    }
};

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