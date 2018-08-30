// @flow
import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import { MAIN_COLOR } from '../../constants';
import type { Location as LocationType, Translation } from '../../types';


type Props = {
    location: LocationType,
    translation: Translation,
    onDelete: (id: string) => void
}

export const Location = (props: Props) => {
    const { location, onDelete, translation } = props;
    const {WEATHER, COMMON} = translation;
    let tempInfo = '';
    if (location.temp) {
        const degreesInCelsius = Math.round((location.temp - 32) / 1.8);
        tempInfo = <span><strong>{degreesInCelsius}</strong>°C</span>;
    } else {
        tempInfo = WEATHER.NOT_AVAILABLE;
    }
    return (
        <Row style={{paddingTop: 5, paddingBottom: 5}}>
            <Col xs={6}>
                <Glyphicon glyph='map-marker' style={{marginRight: 5, color: MAIN_COLOR}} />
                {`${location.city}${location.region && ` (${location.region})`}, ${location.country}`}
            </Col>
            <Col xs={4}>{tempInfo}{location.text && `, ${location.text.toLowerCase()}`}</Col>
            <Col xs={2}>
                <Glyphicon
                    glyph="trash"
                    className="pull-right"
                    style={{marginRight: 10, color: 'grey', cursor: 'pointer'}}
                    title={COMMON.DELETE}
                    onClick={onDelete}
                />
            </Col>
        </Row>
    );
};

export default Location;
