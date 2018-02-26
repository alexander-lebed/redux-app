// @flow
import React from 'react';
import { Map } from 'immutable';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';


type Props = {
    location: Map<string, any>,
    onDelete: (id: string) => void
}

export const Location = (props: Props) => {
    const { location, onDelete } = props;
    let tempInfo = '';
    if (location.get('temp')) {
        const degreesInCelsius = Math.round((location.get('temp') - 32) / 1.8);
        tempInfo = `${degreesInCelsius} °C`;
    } else {
        tempInfo = 'not available';
    }
    return (
        <Row>
            <Col xs={6}>
                <Glyphicon glyph='map-marker' style={{marginRight: 5, color: 'grey'}} />
                {location.get('city')}
            </Col>
            <Col xs={3}>{tempInfo}</Col>
            <Col xs={3}>
                <Glyphicon
                    glyph="remove"
                    className="pull-right"
                    style={{marginRight: 10, color: 'grey'}}
                    title="Remove Location"
                    onClick={onDelete}
                />
            </Col>
        </Row>
    );
};

export default Location;
