// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import queryString from 'query-string';
import { Row, Col, Table, FormGroup, FormControl, ButtonToolbar, Button, Glyphicon } from 'react-bootstrap';
import { MAIN_COLOR } from '../../constants';
import type { User } from '../../types';

type Props = {
    history: Object;
    user: User,
    users: Map<string, User>
}

type State = {
    searchText: string,
    participants: Array<string>
}

export class CreateConversation extends React.Component<void, Props, State> {
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
        let {users, user, history} = this.props;

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
                                    Cancel
                                </Button>
                                <Button
                                    bsStyle='primary'
                                    disabled={participants.length === 0}
                                    onClick={() => history.push(`/conversation?${queryString.stringify({userIds: participants})}`)}
                                >
                                    Create conversation
                                </Button>
                            </ButtonToolbar>
                        </Col>
                        <Col xs={12} sm={5} style={{float: 'left'}}>
                            <FormGroup>
                                <div className="inner-addon left-addon">
                                    <Glyphicon glyph='search' />
                                    <FormControl
                                        type='text'
                                        placeholder='Search participants'
                                        value={searchText}
                                        onChange={e => this.setState({searchText: e.target.value})}
                                    />
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                    {users.length === 0 ? <div className='text-center'>No results</div> :
                        <Table hover>
                            <tbody>
                                {users.map(user => {
                                    const selected = participants.includes(user._id);
                                    const glyphStyle = user.online ? {...{color: MAIN_COLOR }, ...{marginRight: 15}} : {marginRight: 15};
                                    return (
                                        <tr key={user._id} id={user._id}>
                                            <td className={selected && 'active'} onClick={() => this.toggleParticipant(user._id)}>
                                                <Row style={{marginRight: 0}}>
                                                    <Col xs={6}>
                                                        <Glyphicon glyph='user' style={glyphStyle} />
                                                        {user.username}
                                                    </Col>
                                                    <Col xs={6}>
                                                        <div className="material-switch pull-right">
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
        users: state.users.users
    }),
    { }
)(CreateConversation);