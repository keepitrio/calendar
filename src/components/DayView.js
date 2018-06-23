import React, { Component } from 'react';
import EventsContainer from './EventsContainer';
import axios from 'axios';
import EventForm from './EventForm';

class DayView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            dayId: null,
            showForm: false,
            showEvents: true,
            showButton: true,
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/v1/events.json')
        .then(response => {
            this.setState({events: response.data});
        })
        .catch(error => console.log(error))
    }

    showForm = () => {
        this.setState({showForm: true, showEvents: false, showButton: false});
    }

    render() {
        return (
            <div className="day-box">
                <p className="day-number">{this.props.day}</p>
                {this.state.showButton && <button className="new-event-button" onClick={this.showForm}></button>}
                {this.state.showForm && <EventForm  events={this.state.events} day={this.props.day} />}
                {this.state.showEvents && <EventsContainer events={this.state.events} day={this.props.day} />}
            </div>
        )
    }
}

export default DayView;
