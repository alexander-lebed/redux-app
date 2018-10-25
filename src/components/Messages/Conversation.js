// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Picker, Emoji } from 'emoji-mart'
import Linkify from 'react-linkify';
import _ from 'lodash';
import { Map } from 'immutable';
import queryString from 'query-string';
import { Row, Col, Table, Form, FormGroup, FormControl, HelpBlock, Button, Glyphicon, Image, Modal } from 'react-bootstrap';
import { timestampToHumanDate } from '../../helpers/time';
import PeopleSelector from '../common/PeopleSelector';
import { getConversation, getConversationWithUsers, markAsRead, deleteMessage, saveConversation, conversationCleanup } from '../../redux/reducers/conversations';
import { success } from '../../redux/reducers/alerts';
import type { User, Conversation as ConversationType, Message, Translation } from '../../types';
import { ONLINE_STYLE } from '../../constants';

type Props = {
    user: User,
    users: Map<string, User>,
    conversation: ConversationType,
    conversations: Array<ConversationType>,
    translation: Translation,
    location: Object,
    getConversation: Function,
    getConversationWithUsers: Function,
    markAsRead: Function,
    deleteMessage: Function,
    saveConversation: Function,
    conversationCleanup: Function,
    success: Function
}

type State = {
    showModal: boolean,
    messageText: string,
    showEmoji: boolean
};

class Conversation extends React.Component<Props, State> {

    state: State;
    interval: IntervalID;
    scrollableTable: Object | null;

    constructor(params: Props) {
        super(params);
        this.state = {
            showModal: false,
            messageText: '',
            showEmoji: false
        };
        this.scrollableTable = {};
    }

    componentDidMount() {
        this.getConversation();
        setTimeout(() => this.scrollConversationToBottom(), 50);
        setTimeout(() => this.props.markAsRead(), 500);
    }

    componentDidUpdate(prevProps: Props) {
        const prevMessages = prevProps.conversation.messages || [];
        const currentMessages = this.props.conversation.messages || [];
        if (prevMessages.length !== currentMessages.length) {
            setTimeout(() => this.scrollConversationToBottom(), 50);
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

    handleKeyPress = (evt) => {
        if (evt.key === 'Enter' && !evt.shiftKey) {
            evt.preventDefault();
            if (this.state.messageText) {
                const {user, conversation} = this.props;
                const emptyTime = null; // mark as null to set time on backend
                const message: Message = {
                    from: {_id: user._id, username: user.username},
                    text: this.state.messageText,
                    timestamp: emptyTime,
                    read: false,
                    deleted: false
                };
                conversation.messages.push(message);
                conversation.timestamp = emptyTime;
                this.props.saveConversation(conversation);
                this.setState({
                    messageText: ''}
                );
                setTimeout(() => this.scrollConversationToBottom(), 50);
            }
        }
    };

    showAddPeopleModal = (show: boolean) => {
        this.setState({
            showModal: show
        })
    };

    addPeopleToConversation = (people: Array<User>) => {
        const {conversation, saveConversation, success, translation} = this.props;
        const users = people.map(e => ({_id: e._id, username: e.username}));
        conversation.users = conversation.users.concat(users);
        saveConversation(conversation);
        this.showAddPeopleModal(false);
        success(translation.MESSAGES.MEMBERS_ADDED(users.map(e => e.username)));
    };

    render() {
        const {showEmoji} = this.state;
        const {conversation, conversations, translation} = this.props;

        const conversationsExist = conversations.some(e => e._id === conversation._id);

        let body = null;
        if (conversationsExist) {
            const messageStyle = showEmoji ? {paddingRight: 0} : {};
            const emojiStyle = showEmoji ? {paddingLeft: 0} : {};
            body = (
                <div>
                    {this.renderMessages()}
                    <Row>
                        <Col xs={12} sm={showEmoji ? 7 : 12} className='message-form' style={messageStyle}>
                            {this.renderMessageForm()}
                        </Col>
                        <Col xs={12} sm={showEmoji ? 5 : 12} className='emoji-picker' style={emojiStyle}>
                            {showEmoji &&
                            this.renderEmojiPicker()
                            }
                        </Col>
                    </Row>
                </div>
            )
        } else {
            body = (
                <div className='text-center'>
                    {translation.CONVERSATIONS.CONVERSATION_REMOVED}
                </div>
            )
        }
        return (
            <Row style={{marginLeft: 0, marginRight: 0}}>
                <Col xsOffset={0} smOffset={1} mdOffset={2} xs={12} sm={10} md={8}>
                    <div style={{display: 'table', width: '100%', marginBottom: 15}}>
                        <h4 style={{display: 'table-cell',  width: '100%', verticalAlign: 'middle'}} className='text-center'>
                            {translation.MESSAGES.MESSAGES}
                        </h4>
                        <Button
                            id='create-conversation'
                            title={translation.MESSAGES.ADD_PEOPLE}
                            style={{border: 'none', display: 'table-cell', verticalAlign: 'middle'}}
                            className='pull-right btn-circle-icon'
                            onClick={() => this.showAddPeopleModal(true)}
                        >
                            <i className="fa fa-user-plus fa-lg" />
                        </Button>
                    </div>

                    {body}

                    {conversation.users &&
                    <Modal
                        bsSize='large'
                        show={this.state.showModal}
                        className='add-people-modal'
                        onHide={() => this.showAddPeopleModal(false)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{translation.MESSAGES.ADD_PEOPLE}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <PeopleSelector
                                excludeUserIds={conversation.users.map(e => e._id)}
                                submitButtonText={translation.MESSAGES.ADD_PEOPLE}
                                onSubmit={(people) => this.addPeopleToConversation(people)}
                                onCancel={() => this.showAddPeopleModal(false)}
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

    renderEmojiPicker = () => {
        const {messageText} = this.state;
        const {translation} = this.props;
        return (
            <Picker
                title={translation.MESSAGES.PICK_EMOJI}
                emoji='monkey'
                native={true}
                onClick={emoji => {
                    const text = messageText ? messageText + ` ${emoji.native}` : emoji.native;
                    this.setState({messageText: text});
                }}
            />
        )
    };

    renderMessageForm = () => (
        <Form>
            <FormGroup controlId='message-form' style={{display: 'flex', marginBottom: 2}}>
                <div style={{flex: 1}}>
                    <FormControl
                        componentClass='textarea'
                        autoFocus={true}
                        style={style.textControl}
                        rows={4}
                        placeholder={this.props.translation.MESSAGES.WRITE_MESSAGE}
                        value={this.state.messageText}
                        onKeyPress={this.handleKeyPress}
                        onChange={e => this.setState({messageText: e.target.value})}
                    />
                    <Row style={{margin: 0}}>
                        <Col xsHidden>
                            <HelpBlock>
                                {this.props.translation.MESSAGES.WRITE_MESSAGE_INFO}
                            </HelpBlock>
                        </Col>
                    </Row>
                </div>
                <div className='cursor' style={style.emojiSelect}>
                    <Emoji
                        set='twitter'
                        size={32}
                        emoji={this.state.showEmoji ? 'grinning' : 'slightly_smiling_face'}
                        onClick={() => this.setState({showEmoji: !this.state.showEmoji})}
                    />
                </div>
            </FormGroup>
        </Form>
    )
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
    },
    textControl: {
        resize: 'none',
        paddingRight: 60
    },
    emojiSelect: {
        paddingTop: 10,
        paddingRight: 10,
        marginLeft: -43
    }
};

export default connect(
    state => ({
        user: state.authentication.user,
        users: state.users.users,
        conversation: state.conversations.conversation,
        conversations: state.conversations.conversations,
        translation: state.translation
    }),
    { getConversation, getConversationWithUsers, markAsRead, deleteMessage, saveConversation, conversationCleanup, success }
)(Conversation);