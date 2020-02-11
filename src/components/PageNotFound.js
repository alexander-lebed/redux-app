// @flow
import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { LinkContainer } from 'react-router-bootstrap';
import type { Translation } from '../types';

type Props = {
    translation: Translation
}

const PageNotFound = (props: Props) => {
    const homeLink = (
        <LinkContainer key='home' to='/'>
            <span>
                <Button variant='outline-dark' size='sm'>
                    {props.translation.OTHER.HOME}
                </Button>
            </span>
        </LinkContainer>
    );
    return (
        <Container>
            <Row noGutters style={{marginTop: 50}}>
                <Col sm={{span: 6, offset: 3}} style={{textAlign: 'center'}}>
                    <Image
                        src={'/images/robot-heart.png'}
                        style={{backgroundImage: 'radial-gradient(ellipse, white 20%, transparent 68%)'}}
                    />
                    <Jumbotron>
                        <h1>404</h1>
                        <hr />
                        <p>{props.translation.OTHER.PAGE_NOT_FOUND(homeLink)}</p>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    )
};

export default connect(
    state => ({
        translation: state.translation
    })
)(PageNotFound);