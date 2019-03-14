// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import { Picker, Emoji } from 'emoji-mart';
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

    onEmojiClick() {
        this.setState({
            showEmoji: !this.state.showEmoji
        })
    }

    render () {
        const { translation } = this.props;
        const { messageText, showEmoji } = this.state;
        const messageStyle = showEmoji ? {paddingRight: 0} : {};
        const emojiStyle = showEmoji ? {paddingLeft: 0} : {};
        return (
            <Row>
                <Col xs={12} sm={showEmoji ? 7 : 12} className='message-form' style={messageStyle}>
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
                                    emoji={showEmoji ? 'grinning' : 'slightly_smiling_face'}
                                    onClick={() => this.onEmojiClick()}
                                />
                            </div>
                        </FormGroup>
                    </Form>
                </Col>
                <Col xs={12} sm={showEmoji ? 5 : 12} className='emoji-picker' style={emojiStyle}>
                    {showEmoji &&
                        <Picker
                            title={translation.MESSAGES.PICK_EMOJI}
                            emoji='monkey'
                            native={true}
                            onClick={emoji => {
                                const text = messageText ? messageText + ` ${emoji.native}` : emoji.native;
                                this.setState({messageText: text});
                            }}
                        />
                    }
                </Col>
            </Row>
        )
    }
}

const style = {
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
        conversation: state.conversations.conversation,
        translation: state.translation
    }),
    { saveConversation }
)(MessageForm);