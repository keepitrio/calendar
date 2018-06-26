import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class EventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            start: "", 
            end: "",
            errors: []
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { description, start, end } = this.state;
        const { day, editForm, event } = this.props;
        const errors = validate(description, start, end);
        if (errors.length > 0) {
            e.preventDefault();
            this.setState({ errors });
            return;
        }
        this.props.onSubmit(description, start, end, day, editForm, event.id);
    }

    handleCancel = () => {
        this.props.hideForm();
    }

    componentWillMount = () => {
        if (this.props.event){
            const { description, start, end } = this.props.event;
            const startTime = moment(start).format("HH:mm");
            const endTime = moment(end).format("HH:mm");
            this.setState({description: description, start: startTime, end: endTime});
        }
    }
    
    render() {
        const { errors } = this.state;
        return (
            <form className="event-form">
                <p className="error">{errors[0]}</p>
                <p className="error">{errors[1]}</p>
                <p className="error">{errors[2]}</p>
                <p className="error">{errors[3]}</p>
                <label>
                    Description: 
                    <input value={this.state.description} type="text" name="description" onChange={this.handleInput} />
                </label>
                <label>
                    Start time
                    <input value={this.state.start} type="time" name="start" onChange={this.handleInput} />
                </label>
                <label>
                    End time
                    <input value={this.state.end} type="time" name="end" onChange={this.handleInput} />
                </label>
                <div className="form-buttons">
                    <input type="submit" value="Submit" onClick={this.handleSubmit} />
                    <button value="cancel" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>
        )
    }
}


function validate(description, start, end) {
    const errors =[];

    if(!description) {
        errors.push("Description can't be empty");
    }

    if(!start) {
        errors.push("Start time can't be empty");
    }

    if(!end) {
        errors.push("End time can't be empty");
    }

    if(end < start) {
        errors.push("End time can't be before start time");
    }

    return errors;
}

EventForm.propTypes = {
    onSubmit: PropTypes.func,
    event: PropTypes.object
}

export default EventForm;
