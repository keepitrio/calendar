import React, { Component } from 'react';
import Event from './Event';
import PropTypes from 'prop-types';

class EventsContainer extends Component {
    render() {
        const { events, onSubmit } = this.props;
        return (
            <div className="event-box">
                {events.map(event => {
                    return (<Event event={event} key={event.id} day={event.day_id} events={events} onSubmit={onSubmit} />)
                })}
            </div>
        );
    }
}

EventsContainer.propTypes = {
    events: PropTypes.array
}

export default EventsContainer;
