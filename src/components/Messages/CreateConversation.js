// @flow
import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import PeopleSelector from '../common/PeopleSelector';
import type { User, Translation } from '../../types';

type Props = {
    history: Object;
    user: User,
    translation: Translation,
}

export class CreateConversation extends React.Component<Props, void> {

    createConversation = (members: Array<User>) => {
        const url = `/conversation?${queryString.stringify({userIds: members.map(e => e._id)})}`;
        this.props.history.push(url);
    };

    render() {
        let {user, translation, history} = this.props;
        const {CONVERSATIONS} = translation;
        return (
            <PeopleSelector
                excludeUserIds={[user._id]}
                submitButtonText={CONVERSATIONS.CREATE}
                onSubmit={(people) => this.createConversation(people)}
                onCancel={() => history.push('/conversations')}
            />
        )
    }
}

export default connect(
    state => ({
        user: state.authentication.user,
        translation: state.translation
    }),
    { }
)(CreateConversation);
