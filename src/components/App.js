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
import * as AdminAddress from './AdminAddress'
import * as CustomerInfo from './CustomerInfo'
import * as CustomerOrders from './CustomerOrders'
import * as Customeraddress from './CustomerAddresses'
import * as CustomerReservations from './CustomerReservation'
import * as MyOrder from './MyOrder'
import * as Customers from './Customers'
import AdminDashboard from './AdminDashboard'
import * as AdminMemberships from './AdminMemberships'
import * as AdminReservations from './AdminReservations'
import '../stylesheet/App.css';


export default class App extends React.Component {
  render() {
    const Background = require(`../images/MainBackground.jpg`)
    return (
      // <div style={{ backgroundImage: "url(" + Background + ")" }}>
      <RR.Router history={RR.browserHistory}>
        <RR.Route path="/" component={NB}>
        {/* Public USER */}
          <RR.Route path="meals/all" component={Meals.All} />
          <RR.Route path="meals/create" component={Meals.Create} />
          <RR.Route path="meals/update/:id" component={Meals.Update} />

          <RR.Route path="customers/all" component={Customers.All} />
          <RR.Route path="customers/create" component={Customers.Create} />
          <RR.Route path="customers/update/:id" component={Customers.Update} />
          
          <RR.Route path="customeraddress/all" component={Customeraddress.All} />
          <RR.Route path="customeraddress/create" component={Customeraddress.Create}/>
          <RR.Route path="customerreservations/all" component={CustomerReservations.All} />
          <RR.Route path="customerreservations/create" component={CustomerReservations.Create}/>
          <RR.Route path="customerorders/all" component={CustomerOrders.All} />
          <RR.Route path="customerorders/one/:id" component={CustomerOrders.One} />
          <RR.Route path="customerinfo/update" component={CustomerInfo.Update} />
          <RR.Route path="customerinfo/one" component={CustomerInfo.One} />


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

          <RR.Route path="adminaddress/all" component={AdminAddress.All} />
          <RR.Route path="adminaddress/create" component={AdminAddress.Create} />
          <RR.Route path="adminaddress/update/:id" component={AdminAddress.Update} />

          <RR.Route path="adminmemberships/all" component={AdminMemberships.All} />
          <RR.Route path="adminmemberships/create" component={AdminMemberships.Create} />
          <RR.Route path="adminmemberships/update/:id" component={AdminMemberships.Update} />

          <RR.Route path="adminreservations/all" component={AdminReservations.All} />
          <RR.Route path="adminreservations/create" component={AdminReservations.Create} />
          <RR.Route path="adminreservations/update/:id" component={AdminReservations.Update} />

         
          {/* Utils */}

          <RR.Route path="orders/MyOrder" component={MyOrder.One} />
          <RR.Route path="admindashbaord" component={AdminDashboard} />
          <RR.Route path="users" component={Meals.All}>
          <RR.Route path="/user/:userId" component={Meals.All} />
          </RR.Route>
          <RR.Route path="register" component={Auth.Register} />
          <RR.Route path="login" component={Auth.Login} />
          {/* <RR.Route path="logout" component={Auth.Logout} /> */}

          <RR.Route path="*" component={Meals.All} />
        </RR.Route>
      </RR.Router>
      // </div>
    )
  }
}