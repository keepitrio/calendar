import React, { Component } from 'react';
import Moment from 'react-moment';
import EventForm from './EventForm';
import axios from 'axios';
import update from 'immutability-helper';
import PropTypes from 'prop-types';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            showEvent: true,
            editForm: true
        };
    }

    editEvent = () => {
        this.setState({showEvent: false, showForm: true});
    }

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

    render() {
        const { id, description, start, end, day } = this.props.event
        const { onSubmit } = this.props;
        return (
            <div>
                {this.state.showForm && <EventForm events={this.props.events} day={day} editForm={this.state.editForm} id={id} onSubmit={onSubmit} />}
                {this.state.showEvent && 
                    <div className="description" key={id}>
                        <h4>{description}</h4>
                        <p>
                            <Moment format="HH:mm A">{start}</Moment>
                            -
                            <Moment format="HH:mm A">{end}</Moment>
                        </p>
                        <div className="change-buttons">
                            <button className="edit-button btn" onClick={this.editEvent}>edit</button>
                            <button className="delete-button btn" onClick={this.handleDelete}>delete</button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

Event.propTypes = {
    events: PropTypes.array,
    id: PropTypes.number,
    description: PropTypes.string ,
    start: PropTypes.string ,
    end: PropTypes.string ,
    day: PropTypes.number
}

export default Event;
