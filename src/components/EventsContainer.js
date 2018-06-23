import React, { Component } from 'react';
import Event from './Event';

class EventsContainer extends Component {
    render() {
        return (
            <div className="event-box">
                {this.props.events.map(event => {
                    if (!event.start || !event.end) return;
                    if (!event.dayId !== this.props.day) return;
                    return (<Event event={event} key={event.id} />)
                })}
            </div>
        );
    }
}

export default EventsContainer;
