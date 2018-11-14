// @flow
import React from 'react';
import { connect } from 'react-redux';
import {Row, Col, Image, Well} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import type { Translation } from '../types';

type Props = {
    translation: Translation
}

const PageNotFound = (props: Props) => {
    const homeLink = (
        <LinkContainer key='home' to='/'>
            <a><strong>{props.translation.OTHER.HOME}</strong></a>
        </LinkContainer>
    );
    return (
        <Row style={{marginTop: 50, marginLeft: 0, marginRight: 0}}>
            <Col smOffset={3} sm={6} style={{textAlign: 'center'}}>
                <Image
                    src={'/robot-heart.png'}
                    style={{backgroundImage: 'radial-gradient(ellipse, white 20%, transparent 68%)'}}
                />
                <Well>
                    {props.translation.OTHER.PAGE_NOT_FOUND(homeLink)}
                </Well>
            </Col>
        </Row>
    )
};

export default connect(
    state => ({
        translation: state.translation
    }),
    { }
)(PageNotFound);