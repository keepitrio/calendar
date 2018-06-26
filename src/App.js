import React from 'react';
import './App.css';
import Calendar from './components/Calendar';

const App = () => {
    return (
        <div className="App">
            <div className="App-header">
                <h1 className="App-title">February</h1>
                <p className="username">Daenerys</p>
            </div>
            <Calendar days={28}/>
        </div>
    );
}

export default App;
