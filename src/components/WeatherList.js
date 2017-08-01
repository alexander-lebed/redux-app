import React from 'react';
import $http from 'axios';
import {connect} from 'react-redux';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import {addLocation, updateLocations, removeLocation} from '../actions/weather-actions';

const Location = (props) => {
    const {location, onDelete} = props;
    const temperature = location.get('temp') ? `${location.get('temp')} F°` : 'not available';
    return (
        <Row>
            <Col xs={6}>{location.get('city')}</Col>
            <Col xs={3}>{temperature}</Col>
            <Col xs={3}>
                <Glyphicon
                    glyph="remove"
                    className="pull-right"
                    title="Remove Location"
                    onClick={onDelete}
                />
            </Col>
        </Row>
    );
};

class WeatherList extends React.Component {

    componentDidMount () {
        this.updateWeather();
    }

    updateWeather () {
        const {locations, updateLocations} = this.props;
        const getWeatherUrl = (location) => {
            return `
            https://query.yahooapis.com/v1/public/yql?q=
            select * from weather.forecast
            where woeid in (
                select woeid from geo.places(1)
                where text="${location.get('city')}, ${location.get('country')}"
            )
            &format=json`
        };
        const promises = locations.map(l => $http.get(getWeatherUrl(l)));
        Promise.all(promises).then(([...response]) => {
            const data = locations.map((l, index) => {
                const results = response[index].data.query.results
                return l.set('temp', results ? results.channel.item.condition.temp : 0);
            })
            updateLocations(data)
        })
    }

    render () {
        const {locations, addLocation, removeLocation} = this.props;
        const onDelete = id => event => removeLocation(id);
        const onAddLocation = (location) => {
            addLocation(location.get('id'));
            setTimeout(this.updateWeather.bind(this), 0);
        }
        const deletedLocations = locations.filter(l => l.get('isDeleted'))
        return (
            <div className="todo">
                <Row>
                    <Col xs={3} />
                    <Col xs={6}>
                        <ul className="todo__list">
                            {locations.filter(l => !l.get('isDeleted'))
                                .map(l => (
                                    <li key={l.get('id')} className="todo__item">
                                        <Location location={l} onDelete={onDelete(l.get('id'))} />
                                    </li>
                                ))
                            }
                        </ul>
                        <ButtonToolbar style={{marginTop: 10}}>
                            <DropdownButton
                                id="add-location"
                                title="Add Location"
                                disabled={deletedLocations.size === 0}
                                onSelect={(evt) => onAddLocation(evt)}
                            >
                                {deletedLocations.map(l => (
                                    <MenuItem key={l.get('id')} eventKey={l}>
                                        {`${l.get('city')}, ${l.get('country')}`}
                                    </MenuItem>
                                ))}
                            </DropdownButton>
                        </ButtonToolbar>
                    </Col>
                    <Col xs={3} />
                </Row>
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            locations: state.locations
        }
    },
    (dispatch) => {
        return {
            addLocation: id => dispatch(addLocation(id)),
            updateLocations: locations => dispatch(updateLocations(locations)),
            removeLocation: id => dispatch(removeLocation(id))
        }
    }
)(WeatherList)