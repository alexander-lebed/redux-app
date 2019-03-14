// @flow
import React from 'react';
import { connect } from 'react-redux';
import orderBy from 'lodash/orderBy';
import { Map } from 'immutable';
import { Row, Col, Table, FormGroup, FormControl, InputGroup, ButtonToolbar, Button, Glyphicon, Image } from 'react-bootstrap';
import { ONLINE_STYLE } from '../../constants';
import type { User, Translation } from '../../types';

type Props = {
    excludedUserIds?: Array<string>,
    selectedUserIds?: Array<string>,
    submitButtonText?: string,
    onSubmit: (people: Array<User>) => void,
    onCancel: Function,
    // redux props
    users: Map<string, User>,
    translation: Translation,
}

type State = {
    searchText: string,
    people: Array<User>
}

export class PeopleSelector extends React.Component<Props, State> {
    state: State;
    static defaultProps = {
        excludedUserIds: [],
        selectedUserIds: [],
        submitButtonText: ''
    };
    constructor(props: Props) {
        super(props);
        const {selectedUserIds, users} = props;

        let selectedUsers = [];
        if (selectedUserIds.length > 0) {
            selectedUsers = users.toArray().filter(e => selectedUserIds.includes(e._id));
        }
        this.state = {
            searchText: '',
            people: selectedUsers
        }
    }

    toggleUser = (user: User) => {
        const {people} = this.state;
        if (people.map(e => e._id).includes(user._id)) {
            this.setState({
                people: people.filter(e => e._id !== user._id)
            })
        } else {
            this.setState({
                people: people.concat(user)
            })
        }
    };

    render() {
        const {people, searchText} = this.state;
        let {users, excludedUserIds, submitButtonText, onSubmit, onCancel, translation} = this.props;
        const {CONVERSATIONS} = translation;

        users = users.toArray();
        users = users.filter(e => !excludedUserIds.includes(e._id));
        if (searchText) {
            users = users.filter(e => e.username.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
        }
        users = orderBy(users, ['username']);
        return (
            <Row style={{marginLeft: 0, marginRight: 0}}>
                <Col xsOffset={0} smOffset={1} mdOffset={2} xs={12} sm={10} md={8}>
                    <div className='create-conv-header'>
                        <div className='search'>
                            <FormGroup>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        placeholder={CONVERSATIONS.SEARCH_PEOPLE}
                                        value={searchText}
                                        onChange={e => this.setState({searchText: e.target.value})}
                                    />
                                    <InputGroup.Addon>
                                        <Glyphicon glyph='search' />
                                    </InputGroup.Addon>
                                </InputGroup>
                            </FormGroup>
                        </div>
                        <div className='buttons'>
                            <ButtonToolbar className='pull-right'>
                                <Button onClick={onCancel}>
                                    {translation.COMMON.CANCEL}
                                </Button>
                                <Button
                                    bsStyle='primary'
                                    disabled={people.length === 0}
                                    onClick={() => onSubmit(people)}
                                >
                                    {submitButtonText || translation.COMMON.SUBMIT}
                                </Button>
                            </ButtonToolbar>
                        </div>
                    </div>
                    {users.length === 0 ? <div className='text-center'>{translation.COMMON.NO_RESULTS}</div> :
                        <Table hover>
                            <tbody>
                                {users.map(user => {
                                    const selected = people.map(e => e._id).includes(user._id);
                                    return (
                                        <tr key={user._id} id={user._id}>
                                            <td className={selected ? 'active' : ''} onClick={() => this.toggleUser(user)}>
                                                <Row style={{marginRight: 0}}>
                                                    <Col xs={6}>
                                                        <div className='profile-picture-wrapper'>
                                                            <Image
                                                                circle
                                                                style={user.online ? ONLINE_STYLE : {}}
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
        users: state.users.users,
        translation: state.translation
    }),
    { }
)(PeopleSelector);
