// @flow
import React from 'react';
import type { Node } from 'react';
import $http from 'axios';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { PLACES_URL } from '../../constants';
import { updateData } from '../../redux/reducers/weather'
import Location from './Location';
import type { State as CurrentData, Location as LocationType, Translation } from '../../types';


type Props = {
    locations: Array<LocationType>,
    translation: Translation,
    updateData: (data: CurrentData) => void
}

type State = {
    searchText: string,
    searchList: Array<LocationType>
}

export class WeatherList extends React.Component<Props, State> {
    state: State;
    timer: TimeoutID;
    constructor(props: Props) {
        super(props);
        this.state = {
            searchText: '',
            searchList: []
        };
    }

    componentDidMount() {
        // for backward compatibility; $FlowFixMe
        if (this.props.locations.size) {
            this.props.updateData([]);
        }

        this.updateWeather();
    }

    onSearch = (text: string) => {
        this.setState({
            searchText: text
        });

        const search = async (city) => {
            const response = await $http.get(`${PLACES_URL}?city=${city}`);
            const locations = response.data.map(e => {
                const locationName = e.description;
                const locArr = locationName.split(',');
                const city = locArr[0];
                let region = '', country = '';
                if (locArr.length === 3) {
                    region = locArr[1].substring(1);
                    country = locArr[2].substring(1);
                } else {
                    country = locArr[1].substring(1);
                }
                return {id: e.id, city, region, country};
            });

            this.setState({
                searchList: locations
            });
        };
        const delay = (callback, ms) => {
            clearTimeout(this.timer);
            this.timer = setTimeout(callback, ms)
        };

        if (this.state.searchText !== text) {
            delay(() => search(text), 300);
        }
    };

    updateWeather = async () => {
        const { locations } = this.props;
        const getWeatherUrl = (location): string => `
            https://query.yahooapis.com/v1/public/yql?q=
            select * from weather.forecast
            where woeid in (
                select woeid from geo.places(1)
                where text="${location.city}, ${location.country}${location.region && `, ${location.region}`}"
            )
            &format=json`;
        const promises = locations.map(l => $http.get(getWeatherUrl(l)));
        const responses = await Promise.all(promises);
        const data = locations.map((l, index) => {
            const results = responses[index].data.query.results;
            if (results && results.channel.item.condition) {
                const condition = results.channel.item.condition;
                l.temp = condition.temp;
                l.text = condition.text
            }
            return l;
        });
        this.props.updateData(data);
    };

    render() {
        const {searchList} = this.state;
        const {locations, updateData, translation} = this.props;
        const {WEATHER} = translation;

        const onAddLocation = (loc) => {
            const location = {
                id: `${loc.city}${loc.region && `,${loc.region}`},${loc.country}`,
                city: loc.city,
                region: loc.region,
                country: loc.country,
                isDeleted: false
            };
            locations.push(location);
            updateData(locations);
            setTimeout(this.updateWeather, 50);
        };

        const removeLocation = (id: string) => {
            updateData(locations.filter(e => e.id !== id));
        };
        return (
            <Row style={{marginLeft: 0, marginRight: 0}}>
                <Col xsOffset={0} smOffset={3} xs={12} sm={6}>
                    <Row>
                        <Col xs={12} sm={6}>
                            <SelectContainer inputChange={e => this.onSearch(e.target.value)}>
                                <Select
                                    name="search-location"
                                    searchable
                                    placeholder={WEATHER.SEARCH_LOCATION}
                                    onChange={o => onAddLocation(o.value)}
                                    options={searchList.map(e => {
                                        return {
                                            label: `${e.city}${e.region && ` (${e.region})`}, ${e.country}`,
                                            value: e
                                        }
                                    })}
                                />
                            </SelectContainer>
                        </Col>
                    </Row>
                    <div style={{paddingTop: 15}}>

                        {locations.length === 0 && <div>{WEATHER.NO_LOCATIONS}</div>}

                        <ul className="weather-list">
                            {locations.filter(l => !l.isDeleted)
                                .map(l => (
                                    <li key={l.id} className="weather-item">
                                        <Location location={l} onDelete={() => removeLocation(l.id)} translation={translation} />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </Col>
            </Row>
        );
    }
}

type ContainerProps = {inputChange: Function, children: Node}
const SelectContainer = (props: ContainerProps) => <div onKeyUp={props.inputChange}>{props.children}</div>;

export default connect(
    state => ({
        locations: state.weather,
        translation: state.translation
    }),
    { updateData }
)(WeatherList);
