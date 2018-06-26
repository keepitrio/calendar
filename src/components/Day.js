import React, { Component } from 'react';
import EventsContainer from './EventsContainer';
import EventForm from './EventForm';
import PropTypes from 'prop-types';

class Day extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day: null,
            showForm: false,
            showEvents: true,
            showButton: true,
            events: null,
            editForm: false,
            eventId: null,
            event: null
        };
    }
    
    showForm = () => {
        this.setState({showForm: true, showEvents: false, showButton: false});
    }

    hideForm = () => {
        this.setState({showForm: false, showEvents: true, showButton: true});
    }

    editEvent = (event) => {
        this.setState({showEvents: false, showForm: true, editForm: true, event: event});
    }

    render() {
        const { day, events, onSubmit } = this.props;
        return (
            <div className="day-box">
                <p className="day-number">{day}</p>
                {this.state.showButton && 
                    <button className="new-event-button btn" onClick={this.showForm}> Create </button>
                }
                {this.state.showForm && 
                    <EventForm onSubmit={onSubmit} hideForm={this.hideForm} day={day} editForm={this.state.editForm} event={this.state.event} />
                }
                {this.state.showEvents && 
                    <EventsContainer events={events} day={day} onSubmit={onSubmit} editEvent={this.editEvent} />
                }
            </div>
        )
    }
}

Day.propTypes = {
    day: PropTypes.number,
    events: PropTypes.array,
    onSubmit: PropTypes.func
}

export default Day;
