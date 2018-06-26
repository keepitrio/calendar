import React, { Component } from 'react';
import Event from './Event';
import PropTypes from 'prop-types';

class EventsContainer extends Component {
    render() {
        const { events, onSubmit } = this.props;
        return (
            <div className="event-box">
                {events.map(event => {
                    return (
                        <Event event={event} key={event.id} events={events} onSubmit={onSubmit} editEvent={this.props.editEvent}/>
                    )
                })}
            </div>
        );
    }
}

EventsContainer.propTypes = {
    events: PropTypes.array,
    onSubmit: PropTypes.func,
    editEvent: PropTypes.func
}

export default EventsContainer;
