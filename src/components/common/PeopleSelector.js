// @flow
import React from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { orderBy, timestampToHumanDate } from '../../utils';
import { ONLINE_STYLE } from '../../constants';
import type { User, Translation } from '../../types';

type Props = {
    excludedUserIds?: Array<string>,
    selectedUserIds?: Array<string>,
    submitButtonText?: string,
    onSubmit: (people: Array<User>) => void,
    onCancel: Function,
    // redux props
    users: Array<User>,
    translation: Translation,
}

type State = {
    searchText: string,
    people: Array<User>
}

export class PeopleSelector extends React.PureComponent<Props, State> {
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
            selectedUsers = users.filter(e => selectedUserIds.includes(e._id));
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
        users = users.filter(e => !excludedUserIds.includes(e._id));
        if (searchText) {
            users = users.filter(e => e.username.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
        }
        users = orderBy(users, ['username']);
        return (
            <div>
                <div className='people-select-header'>
                    <InputGroup size='sm' className='search'>
                        <InputGroup.Prepend>
                            <i className='fas fa-search' />
                        </InputGroup.Prepend>
                        <Form.Control
                            placeholder={translation.PEOPLE.SEARCH_PEOPLE}
                            aria-label='Search people'
                            aria-describedby='search'
                            className='search-input'
                            value={searchText}
                            onChange={e => this.setState({searchText: e.target.value})}
                        />
                    </InputGroup>
                    <div className='actions'>
                        <Button size='sm' variant='outline-secondary' onClick={onCancel}>
                            {translation.COMMON.CANCEL}
                        </Button>
                        {' '}
                        <Button
                            size='sm'
                            variant='success'
                            disabled={people.length === 0}
                            onClick={() => onSubmit(people)}
                        >
                            {submitButtonText || translation.COMMON.SUBMIT}
                        </Button>
                    </div>
                </div>
                {users.length === 0 ? <div className='text-center'>{translation.COMMON.NO_RESULTS}</div> :
                    <Table hover>
                        <tbody>
                            {users.map(user => {
                                const selected = people.map(e => e._id).includes(user._id);
                                return (
                                    <tr key={user._id} id={user._id}>
                                        <td className={selected ? 'active' : ''} style={{padding: 5}} onClick={() => this.toggleUser(user)}>
                                            <Row noGutters>
                                                <Col xs={10}>
                                                    <div className='profile-picture-wrapper'>
                                                        <Image
                                                            roundedCircle
                                                            style={user.online ? ONLINE_STYLE : {}}
                                                            className='profile-picture'
                                                            src={user.pictureUrl ? user.pictureUrl : '/images/default-profile.jpg'}
                                                        />
                                                    </div>
                                                    <div style={{fontSize: 13}}>
                                                        <span style={{fontWeight: 700}}>
                                                            {user.username}
                                                        </span>
                                                        <div style={{color: 'grey'}}>
                                                            {!user.online && `${translation.PEOPLE.LAST_SEEN} ${timestampToHumanDate(user.lastTime, false, translation)}`}
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col xs={2}>
                                                    <div className='material-switch pull-right' style={{marginTop: 12}}>
                                                        <input
                                                            type='checkbox'
                                                            checked={selected}
                                                            onChange={() => {}}
                                                        />
                                                        <label className='label-success' />
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
            </div>
        )
    }
}

export default connect(
    state => ({
        users: state.users.users,
        translation: state.translation
    })
)(PeopleSelector);
