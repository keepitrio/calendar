import React, { Component } from 'react';
import EventsContainer from './EventsContainer';
import EventForm from './EventForm';
import PropTypes from 'prop-types';

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
        const { day, events, onSubmit } = this.props;
        return (
            <div className="day-box">
                <p className="day-number">{day}</p>
                {this.state.showButton && 
                    <button className="new-event-button btn" onClick={this.showForm}> Create </button>
                }
                {this.state.showForm && 
                    <EventForm onSubmit={onSubmit} day={day}/>
                }
                {this.state.showEvents && 
                    <EventsContainer events={events} day={day} onSubmit={onSubmit} />
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
