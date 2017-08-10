// @flow
import React from 'react';
import $http from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import type { State, Dispatch } from '../../redux/types';
import { addLocation, updateLocations, removeLocation } from '../../redux/actions/weather-actions';
import Location from './Location';


type Props = {
    locations: State,
    addLocation: (id: string) => void,
    updateLocations: (locations: State) => void,
    removeLocation: (id: string) => void
}

export class WeatherList extends React.Component<void, Props, void> {
  componentDidMount() {
    this.updateWeather();
  }

  updateWeather() {
    const { locations, updateLocations } = this.props;
    const getWeatherUrl = (location): string => `
            https://query.yahooapis.com/v1/public/yql?q=
            select * from weather.forecast
            where woeid in (
                select woeid from geo.places(1)
                where text="${location.get('city')}, ${location.get('country')}"
            )
            &format=json`;
    const promises = locations.map(l => $http.get(getWeatherUrl(l)));
    Promise.all(promises).then(([...response]) => {
      const data = locations.map((l, index) => {
        const results = response[index].data.query.results;
        return l.set('temp', results ? results.channel.item.condition.temp : 0);
      });
      updateLocations(data);
    });
  }

  render() {
    const { locations, addLocation, removeLocation } = this.props;
    const onAddLocation = (location) => {
      addLocation(location.get('id'));
      setTimeout(this.updateWeather.bind(this), 50);
    };
    const deletedLocations = locations.filter(l => l.get('isDeleted'));
    return (
      <div className="todo">
        <Row>
          <Col xs={3} />
          <Col xs={6}>
            <ul className="todo__list">
              {locations.filter(l => !l.get('isDeleted'))
                .map(l => (
                  <li key={l.get('id')} className="todo__item">
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
          <Col xs={3} />
        </Row>
      </div>
    );
  }
}

export default connect(
  state => ({ locations: state.locations }),
  (dispatch: Dispatch) =>
    bindActionCreators({ addLocation, updateLocations, removeLocation }, dispatch)
)(WeatherList);
