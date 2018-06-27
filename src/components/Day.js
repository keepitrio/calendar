import React, { Component } from 'react';
import EventsContainer from './EventsContainer';
import EventForm from './EventForm';
import PropTypes from 'prop-types';
import moment from "moment";

class Day extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentView: "Events",
            eventToEdit: null
        };
    }
    
    showForm = () => {
        this.setState({currentView: "Form"});
    }

    showEditForm = (event) => {
        this.setState({eventToEdit: event, currentView: "Form"})
    }

    hideForm = () => {
        this.setState({currentView: "Events"});
    }

    onSubmit = (description, start, end, day, id) => {
        if(id) {
            this.props.onUpdate(description, start, end, id)
        } else {
            this.props.onSubmit(description, start, end, day);
        }
        this.hideForm();
    }

    formatTime = (start, end) => {
        const startTimeToParse = moment(start);
        const startTimeToDisplay = startTimeToParse.utc().format('HH:mm');
        const endTimeToParse = moment(end);
        const endTimeToDisplay = endTimeToParse.utc().format('HH:mm');

        return {start: startTimeToDisplay, end: endTimeToDisplay};
    }

    render() {
        const { day, events, onSubmit, onDelete } = this.props;
        const { currentView, eventToEdit } = this.state;
        return (
            <div className="day-box">
                <p className="day-number">{day}</p>
                {currentView === "Events" && 
                    <button className="new-event-button btn" onClick={this.showForm}>Create</button>
                }
                {currentView === "Form" && 
                    <EventForm onSubmit={this.onSubmit} eventToEdit={eventToEdit} hideForm={this.hideForm} day={day} formatTime={this.formatTime} />
                }
                {currentView === "Events" && 
                    <EventsContainer events={events} day={day} onSubmit={onSubmit} showEditForm={this.showEditForm} hideForm={this.hideForm} onDelete={onDelete} formatTime={this.formatTime} />
                }
            </div>
        );
    }
}

Day.propTypes = {
    day: PropTypes.number.isRequired,
    events: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default Day;
