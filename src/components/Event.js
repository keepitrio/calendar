import React from 'react';
import Moment from 'react-moment';

const Event = (event) => {
    const startTime = event.start;
    const endTime = event.end;
    return (
        <div className="description" key={event.id}>
            <h4>{event.description}</h4>
            <p>
                <Moment format="HH:mm A">{startTime}</Moment>
                <Moment format="HH:mm A">{endTime}</Moment>
            </p>
        </div>
    )
}

export default Event;
