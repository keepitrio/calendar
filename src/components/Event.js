import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Event extends Component {
    handleDelete = () => {
        const { id } = this.props.event;
        this.props.onDelete(id);
    }

    handleEditClick = () => {
        this.props.showEditForm(this.props.event);
    }

    render() {
        const { event } = this.props;
        const { id, description, start, end } = event
        const times = this.props.formatTime(start, end);

        return (
            <div className="description" key={id}>
                <h4>{description}</h4>
                <p>{times.start}-{times.end}</p>
                <div className="change-buttons">
                    <button className="edit-button btn" onClick={this.handleEditClick}>edit</button>
                    <button className="delete-button btn" onClick={this.handleDelete}>delete</button>
                </div>
            </div>
        )
    }
}

Event.propTypes = {
    event: PropTypes.object.isRequired,
    showEditForm: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default Event;
