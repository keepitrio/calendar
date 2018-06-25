import React, { Component } from 'react';
import EventsContainer from './EventsContainer';
import EventForm from './EventForm';

class Day extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dayId: null,
            showForm: false,
            showEvents: true,
            showButton: true,
        };
    }
    
    showForm = () => {
        this.setState({showForm: true, showEvents: false, showButton: false});
    }

    render() {
        return (
            <div className="day-box">
                <p className="day-number">{this.props.day}</p>
                {this.state.showButton && <button className="new-event-button" onClick={this.showForm}> Create </button>}
                {this.state.showForm && <EventForm events={this.props.events} day={this.props.day} />}
                {this.state.showEvents && <EventsContainer events={this.props.events} day={this.props.day} />}
            </div>
        )
    }
}

export default Day;
