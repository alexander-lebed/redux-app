// @flow
import React from 'react';
import { Map } from 'immutable';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { MAIN_COLOR } from '../../constants';


type Props = {
    location: Map<string, any>,
    onDelete: (id: string) => void
}

export const Location = (props: Props) => {
    const { location, onDelete } = props;
    let tempInfo = '';
    if (location.get('temp')) {
        const degreesInCelsius = Math.round((location.get('temp') - 32) / 1.8);
        tempInfo = <span><strong>{degreesInCelsius}</strong>°C</span>;
    } else {
        tempInfo = 'not available';
    }
    return (
        <Row style={{paddingTop: 5, paddingBottom: 5}}>
            <Col xs={4}>
                <Glyphicon glyph='map-marker' style={{marginRight: 5, color: MAIN_COLOR}} />
                {location.get('city')}
            </Col>
            <Col xs={6}>{tempInfo}{location.get('text') && `, ${location.get('text').toLowerCase()}`}</Col>
            <Col xs={2}>
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
