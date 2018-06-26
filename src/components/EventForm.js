import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            start: null, 
            end: null,
            errors: []
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { description, start, end } = this.state;
        const { day, editForm, id } = this.props;
        const errors = validate(description, start, end);
        if (errors.length > 0) {
            e.preventDefault();
            this.setState({ errors });
            return;
        }
        this.props.onSubmit(description, start, end, day, editForm, id);
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
                    <input type="time" name="start" onChange={this.handleInput} />
                </label>
                <label>
                    End time
                    <input type="time" name="end" onChange={this.handleInput} />
                </label>
                <input type="submit" value="Submit" onClick={this.handleSubmit}/>
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
    onSubmit: PropTypes.func
}

export default EventForm;
