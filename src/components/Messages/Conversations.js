// @flow
import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Map } from 'immutable';
import { Row, Col, Table, Badge, Glyphicon, Button, Image } from 'react-bootstrap';
import { MAIN_COLOR } from '../../constants';
import { timestampToHumanDate } from '../../helpers/time';
import { getConversationsByUser, deleteConversation } from '../../redux/reducers/conversations';
import ConfirmationModal from '../common/ConfirmationModal';
import type { User, Conversation as ConversationType, Translation } from '../../types';

type Props = {
    history: Object,
    user: User,
    users: Map<string, User>,
    conversations: Array<ConversationType>,
    translation: Translation,
    getConversationsByUser: Function,
    deleteConversation: Function
}

type State = {
    deleteConversationId: string
}

class Conversations extends React.Component<Props, State> {
    state: State;
    constructor(props: Props) {
        super(props);
        this.state = {
            deleteConversationId: ''
        }
    }

    componentDidMount() {
        this.props.getConversationsByUser(this.props.user._id);
    }

    goToConversation = (convId: string) => {
        this.props.history.push(`/conversation?${queryString.stringify({convId})}`);
    };

    createConversation = () => {
        this.props.history.push('/create-conversation');
    };

    showDeleteConfirmation = (convId: string) => {
        this.setState({
            deleteConversationId: convId
        })
    };

    hideDeleteConfirmation = () => {
        this.setState({
            deleteConversationId: ''
        })
    };

    deleteConversation = () => {
        this.props.deleteConversation(this.state.deleteConversationId);
        this.hideDeleteConfirmation();
    };

    render() {
        const {user, users, conversations, translation} = this.props;
        const {CONVERSATIONS} = translation;
        let content = [];
        if (conversations.length === 0) {
            content = (
                <div className='text-center'>
                    {CONVERSATIONS.NO_CONVERSATIONS}
                </div>
            )
        } else {
            const tableBody = conversations.map(conv => {
                const convMessages = conv.messages.filter(e => !e.deleted);
                const newMessages = convMessages.filter(m => !m.read && m.from._id !== user._id);
                const lastMessage = convMessages.length > 0 ? convMessages[convMessages.length - 1] : null;
                const textStyle = lastMessage && !lastMessage.read ? {...style.text, ...{backgroundColor: '#edf0f5'}} : style.text;

                const convUserIds =  conv.users.map(u => u._id);
                let senders: Array<User> = users.toArray().filter(u => convUserIds.includes(u._id));
                if (senders.length > 1) {
                    senders = senders.filter(u => u._id !== user._id); // exclude recipient
                }
                const sender = senders[0];
                return (
                    <tr key={conv._id} style={newMessages.length > 0 ? {backgroundColor: '#edf0f5'} : {}}>
                        <td className='cursor' style={style.conversation}>
                            <Row>
                                <Col xs={10} onClick={() => this.goToConversation(conv._id)}>

                                    {/* Sender profile picture */}
                                    <div className='profile-picture-wrapper'>
                                        {senders.length === 1 ?
                                            <Image
                                                circle
                                                style={sender.online ? {border: `2px solid ${MAIN_COLOR}`} : {}}
                                                className='profile-picture'
                                                src={sender.pictureUrl ? sender.pictureUrl : '/default-profile.png'}
                                                alt={'Image'}
                                            />
                                            :
                                            <Image
                                                circle
                                                style={senders.some(e => e.online) ? {border: `2px solid ${MAIN_COLOR}`} : {}}
                                                className='profile-picture'
                                                src='/conversation-group.png'
                                                alt={'Image'}
                                            />
                                        }
                                    </div>

                                    {/* Sender name */}
                                    {senders.length === 1 ?
                                        <strong>{sender.username}</strong>
                                        :
                                        <div className='cut-senders-text'>
                                            {senders.map(sender => (
                                                <strong key={sender._id} style={sender.online ? {color: MAIN_COLOR} : {}}>
                                                    {sender.username}
                                                </strong>
                                            )).reduce((prev, curr) => [prev, ', ', curr])}
                                        </div>
                                    }

                                    {/* Last message details */}
                                    {lastMessage &&
                                    <Row style={style.message} onClick={() => this.goToConversation(conv._id)}>
                                        <Col xs={2} className='text-right' style={{paddingRight: 0}}>
                                            {lastMessage.from.username}:
                                        </Col>
                                        <Col xs={8}>
                                            <div style={textStyle}>{lastMessage.text}</div>
                                        </Col>
                                    </Row>
                                    }
                                </Col>
                                <Col xs={2} style={style.convRight}>
                                    {/* Last message time and ability to delete message */}
                                    <span>
                                        {newMessages.length > 0 && <Badge style={{marginRight: 15}}>{newMessages.length}</Badge>}
                                        {timestampToHumanDate(conv.timestamp)}
                                        <Glyphicon
                                            id='delete'
                                            glyph='trash'
                                            title={CONVERSATIONS.DELETE}
                                            className='cursor'
                                            style={{paddingLeft: 10}}
                                            onClick={() => this.showDeleteConfirmation(conv._id)}
                                        />
                                    </span>
                                </Col>
                            </Row>
                        </td>
                    </tr>
                )
            });

            content = (
                <Table hover className='glyphicon-hover'>
                    <tbody>
                        {tableBody}
                    </tbody>
                </Table>
            )
        }
        return (
            <Row style={{marginLeft: 0, marginRight: 0}}>
                <Col xsOffset={0} smOffset={1} mdOffset={2} xs={12} sm={10} md={8}>
                    <h4 style={{marginBottom: 20}} className='text-center'>
                        {CONVERSATIONS.CONVERSATIONS}
                        <Button
                            id='create-conversation'
                            bsSize='small'
                            title={CONVERSATIONS.CREATE}
                            style={{border: 'none'}}
                            className='pull-right btn-circle-glyphicon'
                            onClick={() => this.createConversation()}
                        >
                            <Glyphicon glyph='plus' />
                        </Button>
                    </h4>
                    {content}

                    {this.state.deleteConversationId &&
                        <ConfirmationModal
                            title={translation.COMMON.DELETE_CONFIRMATION}
                            body={CONVERSATIONS.DELETE_CONFIRMATION}
                            onConfirm={() => this.deleteConversation()}
                            onCancel={() => this.hideDeleteConfirmation()}
                        />
                    }
                </Col>
            </Row>
        )
    }
}

const style = {
    conversation: {
        fontSize: 13
    },
    convRight: {
        color: 'grey',
        textAlign: 'right',
        fontSize: 13
    },
    message: {
        color: 'grey',
        fontSize: 13,
        marginTop: 5
    },
    text: {
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 5,
        marginLeft: 5,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 3, // N number of lines to show
        lineHeight: 1.3   // X fallback
        // maxHeight: 3.462    // N * X
    },
    cutSendersText: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        width: 300,
        height: '1.4em',
        whiteSpace: 'nowrap'
    }
};

export default connect(
    state => ({
        user: state.authentication.user,
        users: state.users.users,
        conversations: state.conversations.conversations,
        translation: state.translation
    }),
    { getConversationsByUser, deleteConversation }
)(Conversations);