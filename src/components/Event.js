import React from 'react';
import Moment from 'react-moment';

const Event = (event) => {
    const eventDetails = event.event;
    const startTime = eventDetails.start;
    const endTime = eventDetails.end;
    return (
        <div className="description" key={eventDetails.id}>
            <h4>{eventDetails.description}</h4>
            <p>
                <Moment format="HH:mm A">{startTime}</Moment>
                -
                <Moment format="HH:mm A">{endTime}</Moment>
            </p>
        </div>
    )
}

export default Event;
