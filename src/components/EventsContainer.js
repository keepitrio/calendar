import React, { Component } from 'react';
import Event from './Event';

class EventsContainer extends Component {
    render() {
        return (
            <div className="event-box">
                {this.props.events.map(event => {
                    // eslint-disable-next-line
                    if (event.day_id !== this.props.day) return;
                    return (<Event event={event} key={event.id} />)
                })}
            </div>
        );
    }
}

export default EventsContainer;
