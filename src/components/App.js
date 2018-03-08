import React, { Component } from 'react';
import logo from '../logo.svg';
import NB from './NB';
import '../stylesheet/App.css';

class App extends Component {

  state = {
    component: <div>Choose a table to view it.</div>,
  }

  handleSelect = (eventKey) => {
    this.setState({ component: eventKey})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <NB onSelect = {this.handleSelect} />
          <div className = 'container'>
            {this.state.component}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
