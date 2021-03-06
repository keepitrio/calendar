import React, { Component } from 'react';
import Day from './Day.js';
import axios from 'axios';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/v1/events.json')
        .then(response => {
            this.setState({events: response.data});
        })
        .catch(error => console.log(error))
    }
    
    onSubmit = (description, start, end, day) => {
        axios.post('http://localhost:3001/api/v1/events',
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
            const events = update(this.state.events,
                {
                    $splice: [[0, 0, response.data]]
                });
                this.setState({events: events});
            })
            .catch(error => console.error(error))
        }

    onUpdate = (description, start, end, id) => {
        axios.put(`http://localhost:3001/api/v1/events/${id}`,
            {
                description: description,
                start: start,
                end: end
            })
            .then(response => {
                const eventIndex = this.state.events.findIndex(i => i.id === id);
                const events = update(this.state.events, {
                    [eventIndex]: {$set: response.data}
                });
                this.setState({events: events});
            })
            .catch(error => console.log(error))
    }

    onDelete = (id) => {
        axios.delete(`http://localhost:3001/api/v1/events/${id}`)
        .then(response => {
            const eventIndex = this.state.events.findIndex(i => i.id === id);
            const events = update(this.state.events, { $splice: [[eventIndex, 1]] });
            this.setState({ events: events });
        })
        .catch(error => console.log(error))
    }
        
    render() { 
        let days = [];
        let dayEvents = [];
        
        for(let i = 1; i <= this.props.days; i++) {
            if(this.state.events.length > 0) {
                dayEvents = this.state.events.filter((event) => event.day_id === i).sort(event => event.start);
            }
            days.push(<Day 
                day={i} 
                key={`day-${i}`} 
                events={dayEvents} 
                onSubmit={this.onSubmit}
                onUpdate={this.onUpdate}
                onDelete={this.onDelete}
            />)
        }
            
        return (
            <div className="calendar">{days}</div>
        );
    }
}

Calendar.propTypes = {
    days: PropTypes.number.isRequired
};

export default Calendar;
