// @flow
import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Map } from 'immutable';
import { Row, Col, Table, Badge, Glyphicon, Button } from 'react-bootstrap';
import { MAIN_COLOR } from '../../constants';
import { timestampToHumanDate } from '../../helpers/time';
import { getConversationsByUser, deleteConversation } from '../../redux/reducers/conversations';
import ConfirmationModal from '../common/ConfirmationModal';
import type { User, Conversation as ConversationType } from '../../types';

type Props = {
    history: Object,
    user: User,
    users: Map<string, User>,
    conversations: Array<ConversationType>,
    getConversationsByUser: Function,
    deleteConversation: Function
}

type State = {
    deleteConversationId: string
}

class Conversations extends React.Component<void, Props, State> {
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
        const {user, users, conversations} = this.props;
        let content = [];
        if (conversations.length === 0) {
            content = (
                <div className='text-center'>
                    {'You don\'t have any conversations yet'}
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
                return (
                    <tr key={conv._id} style={newMessages.length > 0 ? {backgroundColor: '#edf0f5'} : {}}>
                        <td className='cursor' style={style.conversation} >
                            <Row>
                                <Col xs={7} sm={9} onClick={() => this.goToConversation(conv._id)}>
                                    <div className='cut-senders-text'>
                                        {senders.map(sender => (
                                            <span key={sender._id} style={sender.online ? {color: MAIN_COLOR} : {}}>
                                                {sender.username}
                                            </span>
                                        )).reduce((prev, curr) => [prev, ', ', curr])}
                                    </div>
                                </Col>
                                <Col xs={5} sm={3} style={style.convRight}>
                                    <span>
                                        {newMessages.length > 0 && <Badge style={{marginRight: 15}}>{newMessages.length}</Badge>}
                                        {timestampToHumanDate(conv.timestamp)}
                                        <Glyphicon
                                            id='remove'
                                            glyph='remove'
                                            className='cursor'
                                            style={{paddingLeft: 10}}
                                            onClick={() => this.showDeleteConfirmation(conv._id)}
                                        />
                                    </span>
                                </Col>
                            </Row>
                            {lastMessage &&
                            <Row style={style.message} onClick={() => this.goToConversation(conv._id)}>
                                <Col xs={3} sm={2} className='text-right' style={{paddingRight: 0}}>
                                    {lastMessage.from.username}:
                                </Col>
                                <Col xs={9} sm={8}>
                                    <div style={textStyle}>{lastMessage.text}</div>
                                </Col>
                            </Row>
                            }
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
                        Conversations
                        <Button
                            id='create-conversation'
                            bsSize='small'
                            title='Create new conversation'
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
                            title={'Delete confirmation'}
                            body={'This will delete conversation for all participants. Are you sure?'}
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
        fontSize: 15
    },
    convRight: {
        color: 'grey',
        textAlign: 'right',
        fontSize: 13
    },
    message: {
        color: 'grey',
        fontSize: 13
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
        lineHeight: 1.154   // X fallback
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
        conversations: state.conversations.conversations
    }),
    { getConversationsByUser, deleteConversation }
)(Conversations);