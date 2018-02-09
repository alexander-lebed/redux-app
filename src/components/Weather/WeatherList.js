// @flow
import React from 'react';
import $http from 'axios';
import { connect } from 'react-redux';
import { Row, Col, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import { addLocation, updateData, removeLocation } from '../../redux/actions/weather-actions';
import Location from './Location';
import type { State } from '../../types';


type Props = {
    currentData: State,
    addLocation: (id: string) => void,
    updateData: (data: State) => void,
    removeLocation: (id: string) => void
}

export class WeatherList extends React.Component<void, Props, void> {

    componentDidMount() {
        this.updateWeather();
    }

    updateWeather = () => {
        const { currentData, updateData } = this.props;
        const locations = currentData.get('locations');
        const getWeatherUrl = (location): string => `
            https://query.yahooapis.com/v1/public/yql?q=
            select * from weather.forecast
            where woeid in (
                select woeid from geo.places(1)
                where text="${location.get('city')}, ${location.get('country')}"
            )
            &format=json`;
        const promises = locations.map(l => $http.get(getWeatherUrl(l)));
        Promise.all(promises)
            .then(([...response]) => {
                const data = locations.map((l, index) => {
                    const results = response[index].data.query.results;
                    return l.set('temp', results ? results.channel.item.condition.temp : 0);
                });
                updateData(currentData.set('locations', data));
            }).catch(err => {
                console.log(err);
            });
    };

    render() {
        const { currentData, addLocation, removeLocation } = this.props;
        const locations = currentData.get('locations');
        const onAddLocation = (location) => {
            addLocation(location.get('id'));
            setTimeout(this.updateWeather, 50);
        };
        const deletedLocations = locations.filter(l => l.get('isDeleted'));
        return (
            <div className="todo">
                <Row>
                    <Col xsOffset={1} smOffset={3} xs={10} sm={6}>
                        <ul className="weather-list">
                            {locations.filter(l => !l.get('isDeleted'))
                                .map(l => (
                                    <li key={l.get('id')} className="weather-item">
                                        <Location location={l} onDelete={() => removeLocation(l.get('id'))} />
                                    </li>
                                ))
                            }
                        </ul>
                        <ButtonToolbar style={{ marginTop: 10 }}>
                            <DropdownButton
                                id="add-location"
                                title="Add Location"
                                disabled={deletedLocations.size === 0}
                                onSelect={l => onAddLocation(l)}
                            >
                                {deletedLocations.map(l => (
                                    <MenuItem key={l.get('id')} eventKey={l}>
                                        {`${l.get('city')}, ${l.get('country')}`}
                                    </MenuItem>
                                ))}
                            </DropdownButton>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(
    state => ({ currentData: state.weather }),
    { addLocation, updateData, removeLocation }
)(WeatherList);
