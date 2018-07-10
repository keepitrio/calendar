import React, { Component } from "react";
import PropTypes from "prop-types";

class EventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
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
        const { day, eventToEdit, onSubmit } = this.props;
        const errors = validate(description, start, end);
        if(errors.length > 0) {
            this.setState({ errors });
            return;
        }
        if(eventToEdit) {
            onSubmit(description, start, end, day, eventToEdit.id);
            return;
        }
        onSubmit(description, start, end, day, null);
    }

    handleCancel = () => {
        this.props.hideForm();
    }

    componentWillMount = () => {
        if(this.props.eventToEdit){
            const { description, start, end } = this.props.eventToEdit;
            const times = this.props.formatTime(start, end);
            this.setState({description: description, start: times.start, end: times.end});
        }
    }
    
    render() {
        const { errors } = this.state;
        let errorsToDisplay = [];
        for(let i = 0; i < errors.length; i++) {
            errorsToDisplay.push(<p className="error" key={`error-${i}`}>{errors[i]}</p>)
        }
        return (
            <form className="event-form">
                <div>{errorsToDisplay}</div>
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
                    <button value="cancel" onClick={this.props.hideForm}>Cancel</button>
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
    hideForm: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    event: PropTypes.object,
    day: PropTypes.number.isRequired
}

export default EventForm;

