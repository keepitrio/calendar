import React, { Component } from 'react';
import Event from './Event';
import PropTypes from 'prop-types';

class EventsContainer extends Component {
    render() {
        return (
            <div className="event-box">
                {this.props.events.map(event => {
                    return (<Event event={event} key={event.id} />)
                })}
            </div>
        );
    }
}

EventsContainer.propTypes = {
    events: PropTypes.array
}

export default EventsContainer;
