import React from "react";
import Image from "react-bootstrap/esm/Image";
import {shouldBeRefreshed} from "../helper";
import Spinner from "react-bootstrap/esm/Spinner";

export interface WeatherReport {
    time: string,
    temperature: string
}

export interface WeatherState {
    currentWeather: WeatherReport,
    lastUpdated: Date | undefined
}

export interface WeatherProps {
    location: Position | undefined
}

function defaultState(): WeatherState {
    return {
        currentWeather: {time: "", temperature: ""},
        lastUpdated: undefined
    }
}

export class Weather extends React.Component<WeatherProps, WeatherState> {

    private symbol: Symbol;

    constructor(props: WeatherProps) {
        super(props);
        this.state = defaultState();
        this.checkWeather = this.checkWeather.bind(this);
        this.symbol = Symbol();
    }

    checkWeather() {
        if (this.props.location && this.props.location.coords) {
            const coords = this.props.location.coords;
            const lat = Math.round(coords.latitude * Math.pow(10, 6)) / Math.pow(10, 6);
            const lon = Math.round(coords.longitude * Math.pow(10, 6)) / Math.pow(10, 6);
            fetch('https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/'
                + lon + '/lat/' + lat
                + '/data.json', {method: 'get'})
                .then((res) => {
                    return res.json();
                })
                .then((json) => {
                    const current = json.timeSeries[1];
                    const temperature = current.parameters[11].values[0];
                    this.setState({
                        currentWeather: {
                            time: new Date(current.validTime).toDateString(),
                            temperature: temperature
                        }
                    }, () => {
                        const toSave: Partial<WeatherState> = {
                            currentWeather: this.state.currentWeather,
                            lastUpdated: new Date()
                        };
                        localStorage.setItem(this.symbol.toString(), JSON.stringify(toSave));
                    })
                })
        }
    }

    componentDidUpdate(props: WeatherProps) {
        if(props.location !== this.props.location || this.state.lastUpdated && shouldBeRefreshed(this.state.lastUpdated)){
            this.checkWeather();
        }
        const stored = JSON.parse(localStorage.getItem(this.symbol.toString()) as string);
        if (stored && stored.lastUpdated) {
            if(shouldBeRefreshed(stored.lastUpdated)){
                this.checkWeather();
            } else if(JSON.stringify(stored.currentWeather) != JSON.stringify(this.state.currentWeather)){
                this.setState(stored);
            }
        }
    }

    render() {
        const currentWeather = this.state.currentWeather;
        return (
            <div className="weather mb-3">
                {currentWeather.temperature
                    ?
                    <div>
                        <Image className="mb-1" src={process.env.PUBLIC_URL + '/weather.png'} fluid/>
                        <p><b>Temperature:</b>{currentWeather.temperature}°C</p>
                    </div>
                    :
                    <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                    </Spinner>}
            </div>
        )
    }
}