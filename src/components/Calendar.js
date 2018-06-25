import React, { Component } from 'react';
import Day from './Day.js';
import axios from 'axios';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/v1/events.json')
        .then(response => {
            this.setState({events: response.data});
        })
        .catch(error => console.log(error))
    }
    
    render() { 
        let days = [];
        let dayEvents = [];
            for(let i = 1; i < this.props.days; i++) {
                if(this.state.events) {
                    dayEvents = this.state.events.filter((event) => event.day_id === i)
                }
                days.push(<Day day={i} key={i} events={dayEvents} />)
            }
        return (
            <div className="calendar">{days}</div>
        )
    }
}

export default Calendar;
