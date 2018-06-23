import React, { Component } from 'react';
import './App.css';
// import EventsContainer from './components/EventsContainer';
import CalendarContainer from './components/CalendarContainer';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1 className="App-title">February</h1>
                    <p className="username">Daenerys | Log out</p>
                </div>
                <CalendarContainer days="29"/>
            </div>
        );
    }
}

export default App;
