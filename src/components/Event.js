import React from 'react';
import Moment from 'react-moment';

const Event = ({ event }) => {
    const { start, end, id, description } = event;

    return (
        <div className="description" key={id}>
            <h4>{description}</h4>
            <p>
                <Moment format="HH:mm A">{start}</Moment>
                -
                <Moment format="HH:mm A">{end}</Moment>
            </p>
        </div>
    )
}

export default Event;
