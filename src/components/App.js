import React, { Component } from 'react';
import logo from '../logo.svg';
import NB from './NB';
import * as RR from 'react-router'
import * as Meals from './Meals'
import * as Auth from './Auth'

import '../stylesheet/App.css';

// class App extends Component {

//   state = {
//     component: <div>Choose a table to view it.</div>,
//   }

//   handleSelect = (eventKey) => {
//     this.setState({ component: eventKey})
//   }

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <div>
//           <NB onSelect = {this.handleSelect} />
//           <div className = 'container'>
//             {this.state.component}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;

export default class App extends React.Component {
  render() {
    return (
      <RR.Router history={RR.browserHistory}>
        <RR.Route path="/" component={NB}>
          <RR.Route path="meals/all" component={Meals.All} />
          <RR.Route path="meals/create" component={Meals.Create} />
          <RR.Route path="meals/update/:id" component={Meals.Update} />
          {/* <RR.Route path="owners/all" component={Owners.All} />
          <RR.Route path="owners/create" component={Owners.Create} />
          <RR.Route path="owners/update/:id" component={Owners.Update} /> */}
          <RR.Route path="users" component={Meals.All}>
            <RR.Route path="/user/:userId" component={Meals.All} />
          </RR.Route>
          <RR.Route path="register" component={Auth.Register} />
          <RR.Route path="login" component={Auth.Login} />
          <RR.Route path="logout" component={Auth.Logout} />

          <RR.Route path="*" component={Meals.All} />
        </RR.Route>
      </RR.Router>
    )
  }
}