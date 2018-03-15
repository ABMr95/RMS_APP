import React, { Component } from 'react';
import logo from '../logo.svg';
import NB from './NB';
import * as RR from 'react-router'
import * as Meals from './Meals'
import * as Auth from './Auth'
import * as AdminMeals from './AdminMeals'
import * as AdminOrders from './AdminOrders'
import * as AdminOrderItems from './AdminOrderItems'
import * as AdminCustomers from './AdminCustomer'
import * as AdminCategory from './AdminCategory'

import * as CustomerInfo from './CustomerInfo'
import * as CustomerOrders from './CustomerOrders'
import * as MyOrder from './MyOrder'


import * as Customers from './Customers'


import '../stylesheet/App.css';


export default class App extends React.Component {
  render() {
    return (
      <RR.Router history={RR.browserHistory}>
        <RR.Route path="/" component={NB}>
        {/* Public USER */}
          <RR.Route path="meals/all" component={Meals.All} />
          <RR.Route path="meals/create" component={Meals.Create} />
          <RR.Route path="meals/update/:id" component={Meals.Update} />

          <RR.Route path="customers/all" component={Customers.All} />
          <RR.Route path="customers/create" component={Customers.Create} />
          <RR.Route path="customers/update/:id" component={Customers.Update} />
          <RR.Route path="orders/MyOrder" component={MyOrder.One} />


          <RR.Route path="customerorders/all" component={CustomerOrders.All} />
          <RR.Route path="customerinfo/update/:id" component={CustomerInfo.Update} />




          {/* ADMIN USER */}

          <RR.Route path="adminmeals/all" component={AdminMeals.All} />
          <RR.Route path="adminmeals/create" component={AdminMeals.Create} />
          <RR.Route path="adminmeals/update/:id" component={AdminMeals.Update} />


          <RR.Route path="admincustomers/all" component={AdminCustomers.All} />
          <RR.Route path="admincustomers/create" component={AdminCustomers.Create} />
          <RR.Route path="admincustomers/update/:id" component={AdminCustomers.Update} />

          <RR.Route path="adminorders/all" component={AdminOrders.All} />
          <RR.Route path="adminorders/create" component={AdminOrders.Create} />
          <RR.Route path="adminorders/update/:id" component={AdminOrders.Update} />

          <RR.Route path="adminorderitems/all" component={AdminOrderItems.All} />
          <RR.Route path="adminorderitems/create" component={AdminOrderItems.Create} />
          <RR.Route path="adminorderitems/update/:id" component={AdminOrderItems.Update} />


          <RR.Route path="admincategory/all" component={AdminCategory.All} />
          <RR.Route path="admincategory/create" component={AdminCategory.Create} />
          <RR.Route path="admincategory/update/:id" component={AdminCategory.Update} />

         
          {/* Utils */}
          
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