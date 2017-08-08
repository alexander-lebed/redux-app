// @flow
import React from 'react';
import {Map} from 'immutable';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

type Props = {
    location: Map<string, any>,
    onDelete: (id: string) => void
}


const Location = (props: Props) => {
    const {location, onDelete} = props;
    let temperature = '';
    if (location.get('temp')) {
        const degreesInCelsius = Math.round((location.get('temp') - 32) / 1.8);
        temperature = `${degreesInCelsius} °C`;
    } else {
        temperature = 'not available';
    }
    return (
        <Row>
            <Col xs={6}>{location.get('city')}</Col>
            <Col xs={3}>{temperature}</Col>
            <Col xs={3}>
                <Glyphicon
                    glyph="remove"
                    className="pull-right"
                    style={{marginRight: 10}}
                    title="Remove Location"
                    onClick={onDelete}
                />
            </Col>
        </Row>
    );
};

export default Location;