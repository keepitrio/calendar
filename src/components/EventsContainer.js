import React, { Component } from 'react';
import Event from './Event';
import PropTypes from 'prop-types';

class EventsContainer extends Component {
    render() {
        const { events, showEditForm, hideForm, onDelete, formatTime } = this.props;
        return (
            <div className="event-box">
                {events.map(event => {
                    return (
                        <Event event={event} key={`event-${event.id}`} events={events} showEditForm={showEditForm} hideForm={hideForm} onDelete={onDelete} formatTime={formatTime} />
                    );
                })}
            </div>
        );
    }
}

EventsContainer.propTypes = {
    events: PropTypes.array.isRequired,
    showEditForm: PropTypes.func.isRequired,
    hideForm: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default EventsContainer;
