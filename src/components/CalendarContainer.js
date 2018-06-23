import React, { Component } from 'react';
import DayView from './DayView.js';

class CalendarContainer extends Component {
    render() {
        const days = [];
        for(let i = 1; i < this.props.days; i++) {
            days.push(<DayView day={i} key={i}/>)
        }
        return (
            <div className="calendar">{days}</div>
        );
    }
}

export default CalendarContainer;
