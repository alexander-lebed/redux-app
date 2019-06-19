// @flow
import React from 'react';
import { connect } from 'react-redux';
import Linkify from 'react-linkify';
import Image from 'react-bootstrap/Image';
import { deleteMessage } from '../../redux/reducers/conversations';
import { timestampToHumanDate } from '../../utils';
import { ONLINE_STYLE } from '../../constants';
import type { User, Message as MessageType, Translation } from '../../types';


type Props = {
    message: MessageType,
    // redux props:
    user: User,
    users: Array<User>,
    translation: Translation,
    deleteMessage: Function,
}

class Message extends React.PureComponent<Props, void> {
    render() {
        const {message, user, users, deleteMessage, translation} = this.props;
        const isMessageFromCurrentUser = message.from._id === user._id;
        const messageUser: User = users.find(e => e._id === message.from._id);
        return (
            <div>
                <div className='profile-picture-wrapper'>
                    <Image
                        roundedCircle
                        style={messageUser.online ? ONLINE_STYLE : {}}
                        className='profile-picture'
                        src={messageUser.pictureUrl ? messageUser.pictureUrl : '/images/default-profile.jpg'}
                    />
                </div>
                <div className='message-top'>
                    <div>
                        <span className='message-from'>
                            {message.from.username}
                        </span>
                        <span className='message-time'>
                            {message.timestamp ? timestampToHumanDate(message.timestamp, true, translation) : translation.MESSAGES.SENDING}
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
    }
}

export default connect(
    state => ({
        user: state.authentication.user,
        users: state.users.users,
        translation: state.translation
    }),
    { deleteMessage }
)(Message);