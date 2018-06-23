import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';

class EventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            start: null, 
            end: null
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) => {
        const { state, props } = this;

        axios.post(
            'http://localhost:3001/api/v1/events',
            { event:
                {
                    description: state.description,
                    start: state.start,
                    end: state.end,
                    dayId: props.day
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
        .catch(error => console.log(error))
    }
    
    render() {
        return (
            <form className="event-form">
                <label>
                    Description:
                    <input type="text" name="description" onChange={this.handleInput} />
                </label>
                <label>
                    Start time:
                    <input type="time" name="start" onChange={this.handleInput} />
                </label>
                <label>
                    End time:
                    <input type="time" name="end" onChange={this.handleInput} />
                </label>
                <input type="submit" value="Submit" onClick={this.handleSubmit}/>
            </form>
        )
    }
}

export default EventForm;
