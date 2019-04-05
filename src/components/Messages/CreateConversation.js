// @flow
import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
            <Container fluid>
                <Row noGutters>
                    <Col md={{span: 10, offset: 1}} lg={{span: 8, offset: 2}}>
                        <PeopleSelector
                            excludedUserIds={[user._id]}
                            submitButtonText={CONVERSATIONS.CREATE}
                            onSubmit={(people) => this.createConversation(people)}
                            onCancel={() => history.push('/conversations')}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(
    state => ({
        user: state.authentication.user,
        translation: state.translation
    })
)(CreateConversation);
