// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Picker, Emoji } from 'emoji-mart';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { saveConversation } from '../../redux/reducers/conversations';
import type {Conversation as ConversationType, Message, Translation, User} from '../../types';

type Props = {
    user: User,
    conversation: ConversationType,
    translation: Translation,
    saveConversation: Function,
}

type State = {
    messageText: string,
    showEmoji: boolean
}

export class MessageForm extends React.Component<Props, State> {

    state: State;
    textAreaRef = React.createRef();

    constructor(params: Props) {
        super(params);
        this.state = {
            messageText: '',
            showEmoji: false
        };
    }

    handleKeyPress = (evt: any) => {
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
            }
        }
    };

    onEmojiClick = () => this.setState({showEmoji: !this.state.showEmoji});

    setText = (text) => {
        const input = this.textAreaRef.current;
        const {selectionStart, selectionEnd, value} = input;
        const updatedText = `${value.substring(0, selectionStart)}${text}${value.substring(selectionEnd)}`;
        input.focus();
        input.selectionEnd= selectionEnd + 7;
        this.setState({messageText: updatedText});
    };

    render () {
        const { translation } = this.props;
        const { messageText, showEmoji } = this.state;
        const messageStyle = showEmoji ? {paddingRight: 0} : {};
        const emojiStyle = showEmoji ? {paddingLeft: 0} : {};
        return (
            <Row noGutters>
                <Col xs={12} sm={showEmoji ? 7 : 12} style={messageStyle}>
                    <Form>
                        <Form.Group controlId='message-form' className='message-form' style={{display: 'flex', marginBottom: 2}}>
                            <div style={{flex: 1}}>
                                <Form.Control
                                    id="message-textarea"
                                    ref={this.textAreaRef}
                                    as='textarea'
                                    autoFocus={true}
                                    className='text-area'
                                    rows={4}
                                    placeholder={this.props.translation.MESSAGES.WRITE_MESSAGE}
                                    value={messageText}
                                    onKeyPress={this.handleKeyPress}
                                    onChange={e => this.setState({messageText: e.target.value})}
                                />
                                <Form.Text className='text-muted d-none d-sm-block'>
                                    {this.props.translation.MESSAGES.WRITE_MESSAGE_INFO}
                                </Form.Text>
                            </div>
                            <div className='emoji-select-area'>
                                <Emoji
                                    set='twitter'
                                    size={32}
                                    emoji={showEmoji ? 'grinning' : 'slightly_smiling_face'}
                                    onClick={() => this.onEmojiClick()}
                                />
                            </div>
                        </Form.Group>
                    </Form>
                </Col>
                <Col xs={12} sm={showEmoji ? 5 : 12} style={emojiStyle}>
                    {showEmoji &&
                    <Picker
                        title={translation.MESSAGES.PICK_EMOJI}
                        emoji='monkey'
                        native={true}
                        onClick={emoji => this.setText(emoji.native)}
                    />
                    }
                </Col>
            </Row>
        )
    }
}

export default connect(
    state => ({
        user: state.authentication.user,
        conversation: state.conversations.conversation,
        translation: state.translation
    }),
    { saveConversation }
)(MessageForm);