import React, { Component } from 'react';
import * as BS from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const API = "http://localhost:51064";

export default class AdminDashboard extends Component {

    render() {
        return (
            <div>
                <h3 style={{ paddingLeft: 20 }}>Admin Dashboard</h3>
                <br />
                <BS.Nav bsStyle="tabs" onSelect={this.handleSelect}>
                    <LinkContainer to='/admincustomers/all'><BS.NavItem>Customers</BS.NavItem></LinkContainer>
                    <LinkContainer to='/adminmeals/all'><BS.NavItem>Meals</BS.NavItem></LinkContainer>
                    <LinkContainer to='/adminorders/all'><BS.NavItem>Orders</BS.NavItem></LinkContainer>
                    <LinkContainer to='/adminorderitems/all'><BS.NavItem>Order Items</BS.NavItem></LinkContainer>
                    <LinkContainer to='/adminaddress/all'><BS.NavItem>Addresses</BS.NavItem></LinkContainer>
                    <LinkContainer to='/admincategory/all'><BS.NavItem>Categories</BS.NavItem></LinkContainer>
                    <LinkContainer to='/adminmemberships/all'><BS.NavItem>Memberships</BS.NavItem></LinkContainer>
                    <LinkContainer to='/adminreservations/all'><BS.NavItem>Reservations</BS.NavItem></LinkContainer>
                </BS.Nav>
            </div>
        );
    }
}