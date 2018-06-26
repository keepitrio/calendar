import React, { Component } from 'react';
import Moment from 'react-moment';

import axios from 'axios';
import update from 'immutability-helper';
import PropTypes from 'prop-types';

class Event extends Component {
    handleDelete = (e) => {
        const { id } = this.props.event;
        axios.delete(`http://localhost:3001/api/v1/events/${id}`)
        .then(response => {
            const eventIndex = this.props.events.findIndex(i => i.id === id);
            const events = update(this.props.events, { $splice: [[eventIndex, 1]] });
            this.setState({ events: events });
            window.location.reload();
        })
        .catch(error => console.log(error))
    }

    handleEditClick = () => {
        this.props.editEvent(this.props.event);
    }

    render() {
        const { event } = this.props;
        const { id, description, start, end } = event
        return (
            <div className="description" key={id}>
                <h4>{description}</h4>
                <p>
                    <Moment format="HH:mm A">{start}</Moment>
                    -
                    <Moment format="HH:mm A">{end}</Moment>
                </p>
                <div className="change-buttons">
                    <button className="edit-button btn" onClick={this.handleEditClick}>edit</button>
                    <button className="delete-button btn" onClick={this.handleDelete}>delete</button>
                </div>
            </div>
        )
    }
}

Event.propTypes = {
    events: PropTypes.array,
    id: PropTypes.number,
    description: PropTypes.string ,
    start: PropTypes.string,
    end: PropTypes.string
}

export default Event;
