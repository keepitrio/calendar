import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';

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
        const { description, start, end } = this.state;
        const { day } = this.props;
        const errors = validate(description, start, end);
        console.log(errors);
        if (errors.length > 0) {
            e.preventDefault();
            this.setState({ errors });
            return;
        }

        axios.post(
            'http://localhost:3001/api/v1/events',
            { event:
                {
                    description: description,
                    start: start,
                    end: end,
                    day_id: day
                }
            }
        )
        .then(response => {
            const events = update(this.props.events,
            {
                $splice: [[0, 0, response.data]]
            })
            this.setState({events: events})
        })
        .catch(error => console.error(error))
    }
    
    render() {
        const { errors } = this.state;
        return (
            <form className="event-form">
                <label>
                    Description: 
                    <input value={this.state.description} type="text" name="description" onChange={this.handleInput} />
                    <p className="error">{errors[0]}</p>
                </label>
                <label>
                    Start time
                    <input type="time" name="start" onChange={this.handleInput} />
                    <p className="error">{errors[1]}</p>
                </label>
                <label>
                    End time
                    <input type="time" name="end" onChange={this.handleInput} />
                    <p className="error">{errors[2]}</p>
                </label>
                <input type="submit" value="Submit" onClick={this.handleSubmit}/>
            </form>
        )
    }
}

export default EventForm;

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

    return errors;
}
