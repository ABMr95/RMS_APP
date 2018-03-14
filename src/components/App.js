import React, { Component } from 'react';
import logo from '../logo.svg';
import NB from './NB';
import * as RR from 'react-router'
import * as Meals from './Meals'
import * as Auth from './Auth'
import * as AdminMeals from './AdminMeals'
<<<<<<< HEAD
import * as Customers from './Customers'
=======
import * as Orders from './Orders'

>>>>>>> c2bdab3631426926792a118288bd6c0a5fd6675b
import '../stylesheet/App.css';


export default class App extends React.Component {
  render() {
    return (
      <RR.Router history={RR.browserHistory}>
        <RR.Route path="/" component={NB}>
          <RR.Route path="meals/all" component={Meals.All} />
          <RR.Route path="meals/create" component={Meals.Create} />
          <RR.Route path="meals/update/:id" component={Meals.Update} />

          <RR.Route path="adminmeals/all" component={AdminMeals.All} />
          <RR.Route path="adminmeals/create" component={AdminMeals.Create} />
          <RR.Route path="adminmeals/update/:id" component={AdminMeals.Update} />

<<<<<<< HEAD
          <RR.Route path="customers/all" component={Customers.All} />
          <RR.Route path="customers/create" component={Customers.Create} />
          <RR.Route path="customers/update/:id" component={Customers.Update} />
=======
          <RR.Route path="orders/all" component={Orders.All} />
          <RR.Route path="orders/myorder" component={Orders.One} />
>>>>>>> c2bdab3631426926792a118288bd6c0a5fd6675b


          {/* <RR.Route path="owners/all" component={Owners.All} />
          <RR.Route path="owners/create" component={Owners.Create} />
          <RR.Route path="owners/update/:id" component={Owners.Update} /> */}

          
          <RR.Route path="users" component={Meals.All}>
            <RR.Route path="/user/:userId" component={Meals.All} />
          </RR.Route>
          <RR.Route path="register" component={Auth.Register} />
          <RR.Route path="login" component={Auth.Login} />
          {/* <RR.Route path="logout" component={Auth.Logout} /> */}

          <RR.Route path="*" component={Meals.All} />
        </RR.Route>
      </RR.Router>
    )
  }
}