import React, { Component } from 'react';
import './App.css';
import Calendar from './components/Calendar';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1 className="App-title">February</h1>
                    <p className="username">Daenerys</p>
                </div>
                <Calendar days="29"/>
            </div>
        );
    }
}

export default App;
