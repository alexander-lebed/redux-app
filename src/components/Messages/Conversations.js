// @flow
import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { getConversationsByUser, deleteConversation } from '../../redux/reducers/conversations';
import ConfirmationModal from '../common/ConfirmationModal';
import ConversationPreview from './ConversationPreview';
import Spinner from '../common/Spinner';
import type { User, Conversation as ConversationType, Translation } from '../../types';

type Props = {
    history: Object,
    // redux props
    user: User,
    conversations: Array<ConversationType>,
    isConversationsLoaded: boolean,
    translation: Translation,
    getConversationsByUser: Function,
    deleteConversation: Function
}

type State = {
    conversations: Array<ConversationType>,
    filteredConversations: Array<ConversationType>,
    clickedPicture: string,
    deleteConversationId: string
}

class Conversations extends React.PureComponent<Props, State> {
    state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            conversations: [],
            filteredConversations: [],
            clickedPicture: '',
            deleteConversationId: ''
        }
    }

    componentDidMount() {
        this.props.getConversationsByUser(this.props.user._id);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.conversations !== state.conversations) {
            return {
                conversations: props.conversations,
                filteredConversations: props.conversations
            }
        }
        return null;
    }

    onSearch = (value) => {
        if (value === '') {
            this.setState({
                filteredConversations: this.props.conversations // back to original list
            });
        } else {
            const result = this.props.conversations.filter(conv => {
                const matchedUsers = conv.users.filter(u => u.username.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                if (matchedUsers.length > 0) {
                    return true;
                }
                const convMessagesStr = `${conv.messages.map(e => e.text).join(' ')}`.toLowerCase();
                return convMessagesStr.indexOf(value.toLowerCase()) !== -1;
            });
            this.setState({
                filteredConversations: result
            });
        }
    };

    createConversation = () => this.props.history.push('/create-conversation');

    showPictureModal = (url: string) => this.setState({clickedPicture: url});

    hidePictureModal = () =>  this.setState({clickedPicture: ''});

    showDeleteConfirmation = (event, convId: string) => {
        event.stopPropagation();
        this.setState({
            deleteConversationId: convId
        })
    };

    hideDeleteConfirmation = () => this.setState({deleteConversationId: ''});

    deleteConversation = () => {
        this.props.deleteConversation(this.state.deleteConversationId);
        this.hideDeleteConfirmation();
    };

    render() {
        const {user, isConversationsLoaded, translation, history} = this.props;
        const conversations = this.state.filteredConversations;

        let content = [];
        if (!isConversationsLoaded) {
            content = (
                <div style={{paddingTop: '50vh'}}>
                    <Spinner />
                </div>
            )
        } else if (conversations.length === 0) {
            content = (
                <Jumbotron className='text-center'>
                    <p>{translation.CONVERSATIONS.NO_CONVERSATIONS}</p>
                </Jumbotron>
            )
        } else {
            content = ( // delete on hover: <Table hover className='fa-hover'>
                <Table hover>
                    <tbody>
                        {conversations.map(conversation => (
                            <ConversationPreview
                                key={conversation._id}
                                userId={user._id}
                                conversation={conversation}
                                history={history}
                                showPictureModal={this.showPictureModal}
                                showDeleteConfirmation={this.showDeleteConfirmation}
                            />
                        ))}
                    </tbody>
                </Table>
            )
        }
        return (
            <Container fluid>
                <Row>
                    <Col md={{span: 10, offset: 1}} lg={{span: 8, offset: 2}}>
                        <div className='header'>
                            <div style={{color: 'grey'}}>
                                <InputGroup size='sm' className='search-container'>
                                    <InputGroup.Prepend>
                                        <i className='fas fa-search' />
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        placeholder={translation.CONVERSATIONS.SEARCH_IN_CONVERSATIONS}
                                        aria-label='Search conversations'
                                        aria-describedby='search'
                                        className='search-input'
                                        onChange={e => this.onSearch(e.target.value)}
                                    />
                                </InputGroup>
                            </div>
                            <Button
                                variant='outline-dark'
                                size='sm'
                                className='create-btn d-none d-sm-block'
                                onClick={() => this.createConversation()}
                            >
                                <i className='fa fa-comments fa-lg' style={{marginRight: 8}} />
                                {translation.CONVERSATIONS.NEW_CONVERSATION}
                            </Button>
                            <Button
                                variant='outline-dark'
                                className='d-block d-sm-none btn-mobile-icon'
                                title={translation.CONVERSATIONS.NEW_CONVERSATION}
                                onClick={() => this.createConversation()}
                            >
                                <i className='fa fa-comments fa-lg' />
                            </Button>
                        </div>
                        {
                            content
                        }
                        {this.state.clickedPicture &&
                        <Modal
                            show={this.state.clickedPicture !== null}
                            className='profile-modal'
                            onHide={this.hidePictureModal}
                        >
                            <Modal.Body style={{textAlign: 'center'}}>
                                <Image
                                    className='profile-modal-picture'
                                    src={this.state.clickedPicture}
                                />
                            </Modal.Body>
                        </Modal>
                        }

                        {this.state.deleteConversationId &&
                        <ConfirmationModal
                            title={translation.COMMON.DELETE_CONFIRMATION}
                            body={translation.CONVERSATIONS.DELETE_CONFIRMATION}
                            onConfirm={() => this.deleteConversation()}
                            onCancel={() => this.hideDeleteConfirmation()}
                        />
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(
    state => ({
        user: state.authentication.user,
        conversations: state.conversations.conversations,
        isConversationsLoaded: state.conversations.isConversationsLoaded,
        translation: state.translation
    }),
    { getConversationsByUser, deleteConversation }
)(Conversations);