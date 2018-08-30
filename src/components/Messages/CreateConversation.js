// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import queryString from 'query-string';
import { Row, Col, Table, FormGroup, FormControl, InputGroup, ButtonToolbar, Button, Glyphicon, Image } from 'react-bootstrap';
import { onlineStyle } from '../../constants';
import type { User, Translation } from '../../types';

type Props = {
    history: Object;
    user: User,
    users: Map<string, User>,
    translation: Translation,
}

type State = {
    searchText: string,
    participants: Array<string>
}

export class CreateConversation extends React.Component<Props, State> {
    state: State;
    constructor(props: Props) {
        super(props);
        this.state = {
            searchText: '',
            participants: []
        }
    }

    toggleParticipant = (userId: string) => {
        const {participants} = this.state;
        if (participants.includes(userId)) {
            this.setState({
                participants: participants.filter(id => id !== userId)
            })
        } else {
            this.setState({
                participants: participants.concat(userId)
            })
        }
    };

    render() {
        const {participants, searchText} = this.state;
        let {users, user, translation, history} = this.props;
        const {CONVERSATIONS} = translation;

        users = users.toArray();
        users = users.filter(e => e._id !== user._id);
        if (searchText) {
            users = users.filter(e => e.username.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
        }
        return (
            <Row style={{marginLeft: 0, marginRight: 0}}>
                <Col xsOffset={0} smOffset={1} mdOffset={2} xs={12} sm={10} md={8}>
                    <Row>
                        <Col xs={12} sm={7} style={{float: 'right', marginBottom: 10}}>
                            <ButtonToolbar className='pull-right'>
                                <Button onClick={() => history.push('/conversations')}>
                                    {translation.COMMON.CANCEL}
                                </Button>
                                <Button
                                    bsStyle='primary'
                                    disabled={participants.length === 0}
                                    onClick={() => history.push(`/conversation?${queryString.stringify({userIds: participants})}`)}
                                >
                                    {CONVERSATIONS.CREATE}
                                </Button>
                            </ButtonToolbar>
                        </Col>
                        <Col xs={12} sm={5} style={{float: 'left'}}>
                            <FormGroup>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        placeholder={CONVERSATIONS.SEARCH_PARTICIPANTS}
                                        value={searchText}
                                        onChange={e => this.setState({searchText: e.target.value})}
                                    />
                                    <InputGroup.Addon>
                                        <Glyphicon glyph='search' />
                                    </InputGroup.Addon>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    {users.length === 0 ? <div className='text-center'>{translation.COMMON.NO_RESULTS}</div> :
                        <Table hover>
                            <tbody>
                                {users.map(user => {
                                    const selected = participants.includes(user._id);
                                    return (
                                        <tr key={user._id} id={user._id}>
                                            <td className={selected && 'active'} onClick={() => this.toggleParticipant(user._id)}>
                                                <Row style={{marginRight: 0}}>
                                                    <Col xs={6}>
                                                        <div className='profile-picture-wrapper'>
                                                            <Image
                                                                circle
                                                                style={user.online ? onlineStyle : {}}
                                                                className='profile-picture'
                                                                src={user.pictureUrl ? user.pictureUrl : '/default-profile.png'}
                                                            />
                                                        </div>
                                                        <div style={{fontSize: 13, fontWeight: 700}}>
                                                            {user.username}
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <div className="material-switch pull-right" style={{marginTop: 12}}>
                                                            <input
                                                                type="checkbox"
                                                                checked={selected}
                                                            />
                                                            <label className="label-success" />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    }
                </Col>
            </Row>
        )
    }
}

export default connect(
    state => ({
        user: state.authentication.user,
        users: state.users.users,
        translation: state.translation
    }),
    { }
)(CreateConversation);