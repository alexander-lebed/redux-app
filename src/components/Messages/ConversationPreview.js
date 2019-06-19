// @flow
import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import { MAIN_COLOR, ONLINE_STYLE } from '../../constants';
import { timestampToHumanDate } from '../../utils';
import type { User, Conversation as ConversationType, Translation } from '../../types';

type Props = {
    userId: string,
    conversation: ConversationType,
    history: Object,
    showPictureModal: Function,
    showDeleteConfirmation: Function,
    // redux props
    users: Array<User>,
    translation: Translation,
}

class ConversationPreview extends React.PureComponent<Props, void> {
    static displayName = 'ConversationPreview';
    render() {
        const {conversation, userId, users, translation, history, showPictureModal, showDeleteConfirmation} = this.props;
        const messages = conversation.messages.filter(e => !e.deleted);
        const unreadMessages = messages.filter(m => !m.read && m.from._id !== userId);
        const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
        const messageTextClass = lastMessage && !lastMessage.read ? 'unread-message' : '';
        const goToConversation = () => {
            history.push(`/conversation?${queryString.stringify({convId: conversation._id})}`);
        };
        return (
            <tr key={conversation._id} className={unreadMessages.length > 0 ? 'new-messages-bg' : ''}>
                <td className='conversation-td'>
                    <Row noGutters>
                        <Col xs={7} sm={10}>
                            <SenderInfo
                                history={history}
                                convId={conversation._id}
                                userId={userId}
                                conversation={conversation}
                                showPictureModal={showPictureModal}
                                users={users}
                            />
                            {/* Last message details (desktop only) */}
                            {lastMessage &&
                                <Row className='message-preview d-none d-sm-flex' onClick={goToConversation}>
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
                        <Col xs={5} sm={2} className='conversation-actions' onClick={goToConversation}>
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
                    <Row className='message-preview d-flex d-sm-none' onClick={goToConversation}>
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
    }
}

export default connect(
    state => ({
        user: state.authentication.user,
        users: state.users.users,
        translation: state.translation
    }),
    {  }
)(ConversationPreview);

type SenderInfoProps = {
    history: Object,
    convId: String,
    userId: string,
    conversation: ConversationType,
    showPictureModal: Function,
    // redux props
    users: Array<User>
}
class SenderInfo extends React.PureComponent<SenderInfoProps, void> {
    static displayName = 'SenderInfo';
    render() {
        const {history, convId, conversation, userId, users, showPictureModal} = this.props;
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
        const goToConversation = () => {
            history.push(`/conversation?${queryString.stringify({convId})}`);
        };
        return (
            <>
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
                <div style={{color: '#343a40'}} onClick={goToConversation}>
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
            </>
        )
    }
}