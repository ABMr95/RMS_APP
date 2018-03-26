import React, { Component } from 'react';
import * as BS from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const API = "http://localhost:63719";

export default class AdminDashboard extends Component {

    render() {
        return (
            <div>
                <h3>Admin Dashboard</h3>
                <br/>
                <BS.Nav bsStyle="tabs" onSelect={this.handleSelect}>
                    <LinkContainer to='/admincustomers/all'><BS.NavItem>Customers</BS.NavItem></LinkContainer>
                    <LinkContainer to='/adminmeals/all'><BS.NavItem>Meals</BS.NavItem></LinkContainer>
                    <LinkContainer to='/adminorders/all'><BS.NavItem>Orders</BS.NavItem></LinkContainer>
                    <LinkContainer to='/adminorderitems/all'><BS.NavItem>Order Items</BS.NavItem></LinkContainer>
                    <LinkContainer to='/adminaddress/all'><BS.NavItem>Addresses</BS.NavItem></LinkContainer>
                    <LinkContainer to='/admincategory/all'><BS.NavItem>Categories</BS.NavItem></LinkContainer>
                </BS.Nav>  
            </div>
        );
    }
}